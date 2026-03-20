import { createClient } from "@supabase/supabase-js";

const POLAR_API_BASE = "https://api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { orderId } = await request.json();

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), { status: 400 });
    }

    // 1. Supabase 인증 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    const polarToken = env.POLAR_ACCESS_TOKEN;
    if (!polarToken) {
      console.error("POLAR_ACCESS_TOKEN not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
    }

    // 2. 주문 정보 조회 및 소유권 확인 (보안 강화)
    const orderRes = await fetch(`${POLAR_API_BASE}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${polarToken}` },
    });
    
    if (!orderRes.ok) {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
    
    const orderData = await orderRes.json();
    
    // 주문 메타데이터의 사용자 ID와 현재 로그인한 사용자 ID 비교
    const orderUserId = orderData.metadata?.supabase_user_id || orderData.customer_metadata?.supabase_user_id;
    if (orderUserId !== user.id) {
      return new Response(JSON.stringify({ error: "You are not authorized to refund this order" }), { status: 403 });
    }

    // 3. 환불 요청
    const refundRes = await fetch(`${POLAR_API_BASE}/refunds/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${polarToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        amount: orderData.amount,
        reason: "Customer requested or Service error",
      }),
    });

    const result = await refundRes.json();
    if (!refundRes.ok) {
      console.error("Polar Refund Error:", result);
      return new Response(JSON.stringify({ error: "Refund request failed" }), { status: refundRes.status });
    }

    return new Response(JSON.stringify({ message: "Refund processed successfully", data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Refund Process Error:", err);
    return new Response(JSON.stringify({ error: "Refund failed" }), { status: 500 });
  }
};
