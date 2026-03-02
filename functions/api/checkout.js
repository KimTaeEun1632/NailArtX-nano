const POLAR_API_BASE = "https://sandbox-api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { productId } = await request.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
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

    const url = new URL(request.url);
    const origin = url.origin;

    const response = await fetch(`${POLAR_API_BASE}/checkouts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${polarToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [productId],
        success_url: `${origin}/generate?checkout_id={CHECKOUT_ID}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify(errorData), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ url: data.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Checkout failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
