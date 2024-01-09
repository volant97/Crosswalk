import { supabase } from '@/lib/supabase-config';

/**유저 정보 확인 */
export const getUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};
