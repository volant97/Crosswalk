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
  if (error) console.error('로그아웃 중 에러가 발생하였습니다.', error);
}
