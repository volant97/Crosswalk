import { FlirtingListRequestType } from '@/types/flirtingListType';
import { supabase } from '../supabase-config';
import { SpecificSubscribeFlirtingListCallbackType } from '@/types/realTimeType';
import { unNullRegisterType } from '@/types/registerType';

/**커스텀 데이터 */
export async function getCustomFlirtingListAtRequest(): Promise<FlirtingListRequestType[]> {
  const { data, error } = await supabase
    .from('flirting_list')
    .select('*, custom_users!flirting_list_sender_uid_fkey(name, avatar, age)')
    .order('created_at', { ascending: false })
    .returns<FlirtingListRequestType[]>();
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

/**status를 READ로 변경*/
export async function changeStatusToRead(receiverUid: string): Promise<void> {
  const { error } = await supabase
    .from('flirting_list')
    .update({ status: 'READ', receiver_is_read_in_noti: true, sender_is_read_in_noti: true })
    .eq('status', 'UNREAD')
    .eq('receiver_uid', receiverUid);
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
}

export async function changeStatusToDecline(flirting_list_id: number): Promise<void> {
  const { error } = await supabase.from('flirting_list').update({ status: 'DECLINE' }).eq('id', flirting_list_id);
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
}

/**Request 채널 구독 */
export async function subscribeRequestedFlirtingList(callback: SpecificSubscribeFlirtingListCallbackType) {
  supabase
    .channel('request')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'flirting_list'
      },
      callback
    )
    .subscribe();
  // console.log('Request 채널 구독 시작');
}

/**Request 채널 구독해제 */
export async function untrackRequestedFlirtingList() {
  const requestRoom = supabase.channel('request');
  await requestRoom.subscribe();
  await requestRoom.untrack();
  // console.log('Request 채널 구독 해제');
}

/**수락 버튼 클릭 */
export async function handleAcceptBtn(listId: number): Promise<void> {
  const { error } = await supabase
    .from('flirting_list')
    .update({
      status: 'ACCEPT',
      receiver_is_read_in_noti: false,
      sender_is_read_in_noti: false,
      first_message_trigger: true
    })
    .eq('id', listId)
    .eq('status', 'READ');
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
}

/**거절 버튼 클릭 */
export async function handleDeclinetBtn(listId: number): Promise<void> {
  const { error } = await supabase
    .from('flirting_list')
    .update({ status: 'DECLINE', receiver_is_read_in_noti: true, sender_is_read_in_noti: true })
    .eq('id', listId)
    .eq('status', 'READ');
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
}
