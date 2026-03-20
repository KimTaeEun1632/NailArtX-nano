-- 기존의 "사용자 직접 수정" 정책 삭제 (보안 취약점 제거)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 새로운 정책: 사용자는 자신의 프로필을 "조회"만 가능함
-- (수정은 이제 SUPABASE_SERVICE_ROLE_KEY를 사용하는 서버 API에서만 가능)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 조회 정책은 유지 (본인 데이터만 확인 가능)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- 참고: UPDATE/INSERT/DELETE 정책을 추가하지 않음으로써 
-- 클라이언트(ANON_KEY)에서의 직접적인 데이터 조작을 원천 차단함.
