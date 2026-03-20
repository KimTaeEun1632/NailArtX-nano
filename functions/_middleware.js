export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. 도메인 리디렉션 (기존 로직 유지)
  if (url.hostname === 'nailartx-nano.pages.dev') {
    const newUrl = new URL(url.pathname + url.search, 'https://nailartxai.com');
    return Response.redirect(newUrl.toString(), 301);
  }

  // 2. 응답 헤더 보안 강화
  const response = await next();
  const newHeaders = new Headers(response.headers);

  // CORS 설정 (필요한 경우 특정 도메인만 허용하도록 화이트리스트 관리 가능)
  const origin = request.headers.get("Origin");
  const allowedOrigins = ["https://nailartxai.com", "http://localhost:3000", "http://localhost:5173", "https://nail-art-ai-frontend.vercel.app"];
  
  if (origin && allowedOrigins.includes(origin)) {
    newHeaders.set("Access-Control-Allow-Origin", origin);
    newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Goog-Api-Key");
  }

  // 필수 보안 헤더 추가
  newHeaders.set("X-Content-Type-Options", "nosniff");
  newHeaders.set("X-Frame-Options", "DENY");
  newHeaders.set("X-XSS-Protection", "1; mode=block");
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  
  // Content Security Policy (기본적인 보안 정책)
  // 실제 환경에 맞춰 조정이 필요할 수 있습니다.
  newHeaders.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.polar.sh https://*.supabase.co https://generativelanguage.googleapis.com;");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
