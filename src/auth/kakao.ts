import { supabase } from '@/lib/supabase-config';

/**카카오 로그인 */
export async function kakaoLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao'
  });
  console.log(data);
  if (error) console.error('login error : ', error);
}
