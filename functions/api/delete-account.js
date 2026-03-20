import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context) {
  const { request, env } = context;

  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceRoleKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 사용자가 보낸 Access Token 가져오기 (Authorization: Bearer <token>)
  const authHeader = request.headers.get("Authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return new Response(
      JSON.stringify({ error: "No access token provided" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 1. 사용자 토큰 검증용 클라이언트 생성
  const userClient = createClient(supabaseUrl, env.VITE_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  // 2. 토큰을 통해 실제 사용자 정보 가져오기 (검증)
  const { data: { user }, error: authError } = await userClient.auth.getUser();

  if (authError || !user) {
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. 관리자 권한 클라이언트로 해당 사용자 삭제
  const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);

  if (deleteError) {
    console.error("Account Delete Error:", deleteError);
    return new Response(
      JSON.stringify({ error: "Failed to delete account. Please contact support." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Account deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
