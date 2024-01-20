import { supabase } from '../supabase-config';
import { createClient } from '@supabase/supabase-js';
import type { RegisterType, unMatchedDataType, unNullRegisterType } from '@/types/registerType';
import type { FlirtingListInNotificationType, FlirtingListType } from '@/types/flirtingListType';
import type { MessageType, SpecificSubscribeFlirtingListCallbackType } from '@/types/realTimeType';
import type { ChatListType } from '@/types/realTimeType';

const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');

export async function getAllData(): Promise<RegisterType[]> {
  const { data, error } = await supabase.from('custom_users').select().returns<RegisterType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function postRegister(uid: any, registerData: any) {
  const { data, error } = await supabase.from('custom_users').update(registerData).eq('uid', uid).select();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function getFlirtingRequestData() {
  const { data, error } = await supabase.from('flirting_list').select('*').returns<FlirtingListType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }

  return data;
}

export async function getNotificationDetail(): Promise<FlirtingListInNotificationType[]> {
  const { data: notificationData, error } = await client
    .from('flirting_list')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<FlirtingListInNotificationType[]>();
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return notificationData;
}

export async function getUser1NameNotification(notificationData: FlirtingListInNotificationType) {
  const { data: user1Data, error } = await client
    .from('custom_users')
    .select('name')
    .eq('uid', notificationData.sender_uid)
    .returns();
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return user1Data;
}

export async function getUser2NameNotification(notificationData: FlirtingListInNotificationType) {
  const { data: user2Data, error } = await client
    .from('custom_users')
    .select('name')
    .eq('uid', notificationData.receiver_uid)
    .returns();
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return user2Data;
}

export async function subscribeFlirtingList(callback: SpecificSubscribeFlirtingListCallbackType) {
  client
    .channel('room1')
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
}

export async function sendFlirting(senderUid: string, message: string, recevierUid: string): Promise<void> {
  const { data, error } = await supabase.from('flirting_list').insert({
    sender_uid: senderUid,
    flirting_message: message,
    receiver_uid: recevierUid,
    created_at: new Date().toISOString(),
    sender_is_read_in_noti: false,
    status: 'UNREAD',
    receiver_is_read_in_noti: false
  });

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
}

export async function getChatList(): Promise<ChatListType[]> {
  const { data, error } = await supabase
    .from('chat_room')
    .select('*, flirting_list(*,sender_uid(uid,name,avatar),receiver_uid(uid,name,avatar))')
    .order('flirting_list(created_at)', { ascending: false })
    .returns<ChatListType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function updateIsReadInNotiSenderSide(id: number | null): Promise<void> {
  const { data, error } = await client
    .from('flirting_list')
    .update({ sender_is_read_in_noti: true })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating is_read_in_noti', error);
    throw new Error('Error updating is_read_in_noti');
  }
}

export async function updateIsReadInNotiReceiverSide(id: number | null): Promise<void> {
  const { data, error } = await client
    .from('flirting_list')
    .update({ receiver_is_read_in_noti: true })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating is_read_in_noti', error);
    throw new Error('Error updating is_read_in_noti');
  }
}

export async function getUnMatchedData(myUid: string) {
  if (!myUid) return;

  // 내가 보냈던 사람의 Uid
  const { data, error } = await supabase.from('flirting_list').select('receiver_uid').eq('sender_uid', myUid);
  const uidsIFlirted = data?.map((item) => {
    return item.receiver_uid;
  });
  // console.log('uidsIFlirted', uidsIFlirted);

  // 내가 보냈던 사람의 Uid를 뺀 나머지 데이터
  const { data: data2 } = await supabase
    .from('custom_users')
    .select('*')
    .not('uid', 'in', `(${uidsIFlirted?.join(',')})`);
  // console.log('data2', data2);

  // 상태가 READ 또는 UNREAD 인 것만 보여주는 데이터
  const { data: data3 } = await supabase
    .from('custom_users')
    .select('*, flirting_list!inner!flirting_list_receiver_uid_fkey(*)')
    .eq('flirting_list.sender_uid', myUid)
    .in('flirting_list.status', ['READ', 'UNREAD']);
  // console.log('data3', data3);

  // 받았던 사람 또는 내가 보냈던 사람의 Uid
  const { data: receivedUserData } = await supabase
    .from('flirting_list')
    .select('sender_uid')
    .eq('receiver_uid', myUid);
  const uidsReceivedFlirted = receivedUserData?.map((item) => {
    return item.sender_uid;
  });
  console.log('uidsreceivedFlirted', uidsReceivedFlirted);

  // 받았던 사람과 보냈던 사람의 Uid를 뺀 나머지 데이터
  const { data: filteredUserData } = await supabase
    .from('custom_users')
    .select('*')
    .not('uid', 'in', `(${uidsReceivedFlirted?.join(',')})`)
    .not('uid', 'in', `(${uidsIFlirted?.join(',')})`);
  console.log('filteredUserData', filteredUserData);

  // 상태가 READ 또는 UNREAD 인 것만 보여주는 데이터
  const { data: unMatchedUser } = await supabase
    .from('custom_users')
    .select('*, flirting_list!inner!flirting_list_receiver_uid_fkey(*)!flirting_list_sender_uid_fkey(*)')
    .eq('flirting_list.sender_uid', myUid)
    .eq('flirting_list.receiver_uid', myUid)
    .in('flirting_list.status', ['READ', 'UNREAD']);
  console.log('unMatchedUser', unMatchedUser);

  const users = [...(filteredUserData || []), ...(unMatchedUser || [])];
  console.log('users', users);

  if (error) {
    console.error('Error getUnMatchedData', error);
    throw new Error('Error getUnMatchedData');
  }
  return users;
}
export async function getMessage(subscribe_room_id: string): Promise<MessageType[]> {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('subscribe_room_id', subscribe_room_id)
    .order('created_at', { ascending: false })
    .returns<MessageType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function postMessage(message_data: MessageType) {
  const { data, error } = await supabase.from('message').insert(message_data);
  console.log(message_data);
  if (error) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
}

export async function subscribeChatRoom(roomId: string, callback: SpecificSubscribeFlirtingListCallbackType) {
  supabase
    .channel(roomId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'message'
      },
      callback
    )
    .subscribe();
}
export async function untrackChatRoom(roomId: string) {
  const chatRoom = supabase.channel(roomId);
  await chatRoom.subscribe();
  await chatRoom.untrack();
  // console.log('Request 채널 구독 해제');
}
