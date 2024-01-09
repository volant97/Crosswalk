import { supabase } from '@/lib/supabase-config';

export const GoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  });
  if (data) alert('로그인 되었습니다');
  if (error) console.error('login error : ', error);
};

export const GoogleLogOut = async () => {
  const { error } = await supabase.auth.signOut();
  alert('로그아웃 되었습니다.');
  if (error) console.error('logout error : ', error);
};
