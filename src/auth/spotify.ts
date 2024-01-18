import { supabase } from '@/lib/supabase-config';

/**스포티파이 로그인 */
export async function spotifyLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify'
    // ,
    // options: {
    //   queryParams: {
    //     access_type: 'offline',
    //     prompt: 'consent'
    //   }
    // }
  });
  console.log(data);
  if (error) console.error('login error : ', error);
}
