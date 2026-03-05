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
        // 결제 완료 또는 구독 활성화 시 Pro 상태로 변경
        const customerEmail = data.customer_email || data.customer?.email;
        if (customerEmail) {
          const { error } = await supabase
            .from("profiles")
            .update({ is_pro: true })
            .eq("email", customerEmail);
          
          if (error) console.error("Webhook Update Error:", error);
          else console.log(`User ${customerEmail} is now PRO via Webhook`);
        }
        break;

      case "subscription.revoked":
      case "subscription.canceled":
        // 구독 취소 또는 만료 시 Pro 상태 해제
        const revokedEmail = data.customer_email || data.customer?.email;
        if (revokedEmail) {
          const { error } = await supabase
            .from("profiles")
            .update({ is_pro: false })
            .eq("email", revokedEmail);
          
          if (error) console.error("Webhook Revoke Error:", error);
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
