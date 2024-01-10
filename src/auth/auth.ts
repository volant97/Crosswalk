import { supabase } from '@/lib/supabase-config';

/**유저 정보 확인 */
export const getUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};

/**로그아웃 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  alert('로그아웃 되었습니다');
  if (error) console.error('logout error : ', error);
}
