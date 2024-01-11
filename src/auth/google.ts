import { supabase } from '@/lib/supabase-config';

/**구글 로그인 */
export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
  if (data) alert('로그인 되었습니다');
  if (error) console.error('login error : ', error);
};
