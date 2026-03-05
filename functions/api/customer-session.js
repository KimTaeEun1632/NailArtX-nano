const POLAR_API_BASE = "https://api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const polarToken = env.POLAR_ACCESS_TOKEN;
    if (!polarToken) {
      return new Response(
        JSON.stringify({ error: "POLAR_ACCESS_TOKEN not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // 1. 이메일로 Polar Customer ID 조회
    const customerResponse = await fetch(`${POLAR_API_BASE}/customers/?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${polarToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!customerResponse.ok) {
      const errorData = await customerResponse.json();
      return new Response(JSON.stringify({ error: "Failed to find customer", detail: errorData }), {
        status: customerResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const customerData = await customerResponse.json();
    const customer = customerData.items?.[0];

    if (!customer) {
      return new Response(JSON.stringify({ error: "Customer not found in Polar" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. 조회된 customer.id로 Session 생성
    const sessionResponse = await fetch(`${POLAR_API_BASE}/customer-sessions/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${polarToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: customer.id,
      }),
    });

    if (!sessionResponse.ok) {
      const errorData = await sessionResponse.json();
      console.error("Polar Session API Error:", JSON.stringify(errorData));
      return new Response(JSON.stringify(errorData), {
        status: sessionResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sessionData = await sessionResponse.json();
    return new Response(JSON.stringify({ token: sessionData.token }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Process failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
