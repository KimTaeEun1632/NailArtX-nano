import { createClient } from "@supabase/supabase-js";

const POLAR_API_BASE = "https://api.polar.sh/v1";

export const onRequestPost = async (context) => {
  try {
    const { env, request } = context;
    const { productId } = await request.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
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

    const url = new URL(request.url);
    const origin = url.origin;

    // 2. 인증된 사용자 ID를 사용하여 결제 세션 생성 (클라이언트가 보낸 userId 무시)
    const response = await fetch(`${POLAR_API_BASE}/checkouts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${polarToken}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        products: [productId],
        success_url: `${origin}/generate?checkout_id={CHECKOUT_ID}`,
        metadata: {
          supabase_user_id: user.id,
        },
        customer_metadata: {
          supabase_user_id: user.id,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Polar Checkout Error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to create checkout session" }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ url: data.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Checkout Process Error:", err);
    return new Response(JSON.stringify({ error: "Checkout failed" }), { status: 500 });
  }
};
