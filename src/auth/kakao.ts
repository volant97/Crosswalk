import { supabase } from '@/lib/supabase-config';

/**카카오 로그인 */
export async function kakaoLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao'
  });
  if (data) alert('로그인 되었습니다');
  if (error) console.error('login error : ', error);
}
