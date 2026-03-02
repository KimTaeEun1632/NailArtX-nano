const POLAR_API_BASE = "https://sandbox-api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { checkoutId } = await request.json();

    const polarToken = env.POLAR_ACCESS_TOKEN;
    if (!polarToken) {
      return new Response(
        JSON.stringify({ error: "POLAR_ACCESS_TOKEN not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const response = await fetch(`${POLAR_API_BASE}/checkouts/${checkoutId}`, {
      headers: { Authorization: `Bearer ${polarToken}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    if (data.status === "confirmed" || data.status === "succeeded") {
      return new Response(
        JSON.stringify({
          success: true,
          orderId: data.order_id,
          email: data.customer_email,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: false, status: data.status }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Verification failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
