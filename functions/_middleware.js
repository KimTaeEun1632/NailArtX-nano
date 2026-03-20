export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. 도메인 리디렉션 (기존 로직 유지)
  if (url.hostname === 'nailartx-nano.pages.dev') {
    const newUrl = new URL(url.pathname + url.search, 'https://nailartxai.com');
    return Response.redirect(newUrl.toString(), 301);
  }

  try {
    const response = await next();
    const newHeaders = new Headers(response.headers);

    // 2. CORS 설정 (필요한 경우 특정 도메인만 허용하도록 화이트리스트 관리 가능)
    const origin = request.headers.get("Origin");
    const allowedOrigins = [
      "https://nailartxai.com", 
      "http://localhost:3000", 
      "http://localhost:5173", 
      "http://localhost:8788",
      "https://nail-art-ai-frontend.vercel.app"
    ];
    
    if (origin && allowedOrigins.includes(origin)) {
      newHeaders.set("Access-Control-Allow-Origin", origin);
      newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
      newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Goog-Api-Key");
    }

    // 3. 필수 보안 헤더 추가
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("X-XSS-Protection", "1; mode=block");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    
    // 4. Content Security Policy (프로젝트 리소스에 맞춰 확장)
    const csp = [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.clarity.ms https://*.google-analytics.com https://*.google.com https://*.gstatic.com https://*.adtrafficquality.google;",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.clarity.ms;",
      "font-src 'self' data: https://fonts.gstatic.com;",
      "img-src 'self' data: blob: https: https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://*.doubleclick.net;",
      "connect-src 'self' https://api.polar.sh https://*.supabase.co https://generativelanguage.googleapis.com https://static.cloudflareinsights.com https://*.google-analytics.com https://stats.g.doubleclick.net https://*.clarity.ms https://*.adtrafficquality.google ws://localhost:* wss://localhost:* ws://127.0.0.1:* wss://127.0.0.1:*;",
      "frame-src 'self' https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://*.google.com https://*.adtrafficquality.google;",
    ].join(" ");

    newHeaders.set("Content-Security-Policy", csp);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    console.error("Middleware Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error in Middleware", details: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
