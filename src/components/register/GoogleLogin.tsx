import { supabase } from '@/lib/supabase-config';

export const GoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });

  if (data) {
    alert('로그인 되었습니다!');
  }
  if (error) console.log(error);

  console.log(data);
};

export const GoogleLogOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

export const getUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};
