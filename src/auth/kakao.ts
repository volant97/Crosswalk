import { supabase } from '@/lib/supabase-config';

/**카카오 로그인 */
export async function kakaoLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao'
  });
  if (error) console.error('로그인 중 에러가 발생하였습니다. ', error);
}
