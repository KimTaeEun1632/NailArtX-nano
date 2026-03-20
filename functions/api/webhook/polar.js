import { createClient } from "@supabase/supabase-js";

// Webhook 서명 검증 함수 (Standard HMAC-SHA256)
async function verifySignature(request, secret) {
  const signature = request.headers.get("webhook-signature");
  if (!signature) return false;

  // Polar의 서명 형식은 "t=123...,v1=hash..." 형태일 수 있습니다.
  // 여기서는 가장 일반적인 전체 바디 해싱 방식을 구현합니다.
  // 참고: 실제 Polar 라이브러리가 있다면 그것을 쓰는 것이 좋으나, 여기선 Web Crypto를 사용합니다.
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // 본문을 복사해서 읽어야 함 (request.json()을 호출하면 다시 읽을 수 없으므로)
  const body = await request.clone().text();
  
  // 서명에서 v1= 이후의 값만 추출 (Polar 표준인 경우)
  let signatureToVerify = signature;
  if (signature.includes("v1=")) {
    signatureToVerify = signature.split("v1=")[1].split(",")[0];
  }

  // 16진수 문자열을 Uint8Array로 변환
  const sigBytes = new Uint8Array(
    signatureToVerify.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );

  return await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    encoder.encode(body)
  );
}

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    // 1. 서명 검증 (보안 핵심)
    const webhookSecret = env.POLAR_WEBHOOK_SECRET;
    if (webhookSecret) {
      const isValid = await verifySignature(request, webhookSecret);
      if (!isValid) {
        console.error("Invalid Webhook Signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 401 });
      }
    } else {
      console.warn("POLAR_WEBHOOK_SECRET not set, skipping verification (Insecure!)");
    }

    const payload = await request.json();
    const eventType = payload.type;
    const data = payload.data;

    console.log(`Received Valid Polar Webhook: ${eventType}`);

    const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

    // 이벤트별 처리 로직
    switch (eventType) {
      case "order.paid":
      case "subscription.created":
      case "subscription.active":
        const userId = data.metadata?.supabase_user_id || data.customer_metadata?.supabase_user_id || data.customer?.metadata?.supabase_user_id;
        const customerId = data.customer_id || data.customer?.id;

        if (userId) {
          const { error } = await supabase
            .from("profiles")
            .update({ 
              is_pro: true,
              polar_customer_id: customerId 
            })
            .eq("id", userId);
          
          if (error) console.error("Webhook Update Error:", error);
        }
        break;

      case "subscription.revoked":
      case "subscription.canceled":
        const revokedUserId = data.customer_metadata?.supabase_user_id || data.metadata?.supabase_user_id;
        if (revokedUserId) {
          await supabase.from("profiles").update({ is_pro: false }).eq("id", revokedUserId);
        }
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook Process Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
