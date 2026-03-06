import { createClient } from "@supabase/supabase-js";

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    const payload = await request.json();
    const eventType = payload.type;
    const data = payload.data;

    console.log(`Received Polar Webhook: ${eventType}`);

    const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

    // 이벤트별 처리 로직
    switch (eventType) {
      case "order.paid":
      case "subscription.created":
      case "subscription.active":
        // 결제 완료 또는 구독 활성화 시 Pro 상태로 변경 및 Customer ID 저장
        // Order 객체의 metadata 또는 Customer 객체의 metadata 확인
        const userId = data.metadata?.supabase_user_id || data.customer_metadata?.supabase_user_id || data.customer?.metadata?.supabase_user_id;
        const customerEmail = data.customer_email || data.customer?.email;
        const customerId = data.customer_id || data.customer?.id;

        if (userId) {
          const { error } = await supabase
            .from("profiles")
            .update({ 
              is_pro: true,
              polar_customer_id: customerId 
            })
            .eq("id", userId);
          
          if (error) console.error("Webhook Update Error (UID):", error);
          else console.log(`User ID ${userId} is now PRO via Webhook (Customer ID: ${customerId})`);
        } else if (customerEmail) {
          // Fallback to email if UID is missing
          const { error } = await supabase
            .from("profiles")
            .update({ 
              is_pro: true,
              polar_customer_id: customerId
            })
            .eq("email", customerEmail);
          
          if (error) console.error("Webhook Update Error (Email):", error);
          else console.log(`User ${customerEmail} is now PRO via Webhook (Customer ID: ${customerId})`);
        }
        break;

      case "subscription.revoked":
      case "subscription.canceled":
        // 구독 취소 또는 만료 시 Pro 상태 해제
        const revokedUserId = data.customer_metadata?.supabase_user_id;
        const revokedEmail = data.customer_email || data.customer?.email;

        if (revokedUserId) {
          const { error } = await supabase
            .from("profiles")
            .update({ is_pro: false })
            .eq("id", revokedUserId);
          
          if (error) console.error("Webhook Revoke Error (UID):", error);
          else console.log(`User ID ${revokedUserId} is no longer PRO via Webhook`);
        } else if (revokedEmail) {
          const { error } = await supabase
            .from("profiles")
            .update({ is_pro: false })
            .eq("email", revokedEmail);
          
          if (error) console.error("Webhook Revoke Error (Email):", error);
          else console.log(`User ${revokedEmail} is no longer PRO via Webhook`);
        }
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook Process Error:", err);
    return new Response(JSON.stringify({ error: "Webhook failed" }), { status: 500 });
  }
};
