-- 1. 기존의 모든 유사 함수 삭제
DROP FUNCTION IF EXISTS public.delete_user();
DROP FUNCTION IF EXISTS public.delete_USER();
DROP FUNCTION IF EXISTS public.delete_self();

-- 2. 새로운 이름으로 함수 생성
CREATE OR REPLACE FUNCTION public.delete_self()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- 관리자 권한으로 실행
SET search_path = public, auth -- 보안 및 경로 설정
AS $$
BEGIN
  -- 현재 로그인한 유저의 ID로 삭제 실행
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;

-- 3. 권한 부여
GRANT EXECUTE ON FUNCTION public.delete_self() TO authenticated;
