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
  // console.log(data);
  if (error) console.error('login error : ', error);
};
