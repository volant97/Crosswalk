import { supabase } from '../supabase-config';
import { createClient } from '@supabase/supabase-js';
import type { RegisterType } from '@/types/registerType';
import type { FlirtingListInNotificationType, FlirtingListType } from '@/types/flirtingListType';
import type { ChatListType, SubscribeFlirtingListCallbackType } from '@/types/realTimeType';

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
  const { data, error } = await supabase.from('custom_users').update([registerData]).eq('uid', uid).select();

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

export async function getCustomFlirtingInNotificationList(): Promise<FlirtingListInNotificationType[]> {
  const { data: userData, error } = await client
    .from('flirting_list')
    // flirting_list의 전체 데이터와 custom_users의 name 값을 가져와 하나의 배열에 넣기
    .select('*, custom_users!flirting_list_sender_uid_fkey(name)')
    .order('created_at', { ascending: false })
    .returns<FlirtingListInNotificationType[]>();
  // .select('flirting_message, custom_users!flirting_list_receiver_uid_fkey(name)');
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return userData;
}

export async function subscribeFlirtingList(callback: SubscribeFlirtingListCallbackType) {
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

export async function sendFlirting(senderUid: string | null, message: string, recevierUid: string) {
  const { data, error } = await supabase
    .from('flirting_list')
    .insert({ sender_uid: senderUid, flirting_message: message, receiver_uid: recevierUid, created_at: new Date() });

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  console.log('data', data);
  return data;
}

export async function getChatList(): Promise<ChatListType[]> {
  const { data, error } = await supabase
    .from('chat_list')
    .select('*, flirting_list(*,sender_uid(uid,name,avatar),receiver_uid(uid,name,avatar))')
    // .select()
    .returns<ChatListType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}
