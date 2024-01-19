import { supabase } from '../supabase-config';
import { createClient } from '@supabase/supabase-js';
import type { RegisterType } from '@/types/registerType';
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

export async function postRegister({ uid, ...registerData }: RegisterType) {
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
  const { error } = await supabase.from('flirting_list').insert({
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
