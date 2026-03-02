const POLAR_API_BASE = "https://sandbox-api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { orderId } = await request.json();

    const polarToken = env.POLAR_ACCESS_TOKEN;
    if (!polarToken) {
      return new Response(
        JSON.stringify({ error: "POLAR_ACCESS_TOKEN not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const orderRes = await fetch(`${POLAR_API_BASE}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${polarToken}` },
    });
    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return new Response(JSON.stringify(orderData), {
        status: orderRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

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
    return new Response(JSON.stringify(result), {
      status: refundRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Refund failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
