import { supabase } from '@/lib/supabase-config';

/**카카오 로그인 */
export async function kakaoLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao'
  });
  if (data) alert('로그인 되었습니다');
  if (error) console.error('login error : ', error);
}

/**카카오 로그아웃 */
export async function kakaoLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('logout error : ', error);
  alert('로그아웃 되었습니다');
}
