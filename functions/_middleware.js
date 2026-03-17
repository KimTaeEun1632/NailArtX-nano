export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 이전 도메인으로 접속했을 경우만 301 리디렉션 수행
  if (url.hostname === 'nailartx-nano.pages.dev') {
    const newUrl = new URL(url.pathname + url.search, 'https://nailartxai.com');
    return Response.redirect(newUrl.toString(), 301);
  }

  // 그 외(새 도메인 등)는 정상적으로 다음 단계 진행
  return next();
}
