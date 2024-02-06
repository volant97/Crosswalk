import { supabase } from '../supabase-config';
import type { unNullRegisterType } from '@/types/registerType';

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
    throw new Error('데이터를 가져오는 도중 에러가 발생하였습니다.');
  }
  return data;
}
