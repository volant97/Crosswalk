import { unNullRegisterType } from '@/types/registerType';
import { supabase } from '../supabase-config';

/**상대프로필 정보 가져오기 */
export async function getOtherPersonCustomUsers(otherPersonId: string): Promise<unNullRegisterType> {
  const { data, error } = await supabase
    .from('custom_users')
    .select()
    .eq('uid', otherPersonId)
    .returns<unNullRegisterType>()
    .single();
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}
