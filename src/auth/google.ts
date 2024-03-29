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
  if (error) console.error('로그인 중 에러가 발생하였습니다. ', error);
};
