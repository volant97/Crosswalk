import { supabase } from '../supabase-config';
import { createClient } from '@supabase/supabase-js';
import type { RegisterType, unMatchedDataType, unNullRegisterType } from '@/types/registerType';
import type { FlirtingListInNotificationType, FlirtingListType } from '@/types/flirtingListType';
import type { MessageType, SendMessageType, SpecificSubscribeFlirtingListCallbackType } from '@/types/realTimeType';
import type { ChatListType } from '@/types/realTimeType';
import { format } from 'date-fns';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';

// const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');

export async function getAllData(): Promise<RegisterType[]> {
  const { data, error } = await supabase.from('custom_users').select().returns<RegisterType[]>();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function postRegister(uid: any, registerData: any) {
  const { data, error } = await supabase.from('custom_users').update(registerData).eq('uid', uid).select();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function getFlirtingRequestData() {
  const { data, error } = await supabase.from('flirting_list').select('*').returns<FlirtingListType[]>();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }

  return data;
}

export async function getNotificationDetail(): Promise<FlirtingListInNotificationType[]> {
  const { data: notificationData, error } = await supabase
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
  const { data: user1Data, error } = await supabase
    .from('custom_users')
    .select('name, uid')
    .eq('uid', notificationData.sender_uid)
    .returns();
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return user1Data;
}

export async function getUser2NameNotification(notificationData: FlirtingListInNotificationType) {
  const { data: user2Data, error } = await supabase
    .from('custom_users')
    .select('name, uid')
    .eq('uid', notificationData.receiver_uid)
    .returns();
  if (error) {
    console.error('에러 발생:', error);
    throw new Error('error while fetching posts data');
  }
  return user2Data;
}

export async function subscribeFlirtingList(callback: SpecificSubscribeFlirtingListCallbackType) {
  supabase
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
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
}

export async function getChatList(): Promise<ChatListType[]> {
  const { data, error } = await supabase
    .from('chat_room')
    .select('*, flirting_list(*,sender_uid(uid,name,avatar,user_img),receiver_uid(uid,name,avatar,user_img))')
    .order('flirting_list(created_at)', { ascending: false })
    .returns<ChatListType[]>();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function updateIsReadInNotiSenderSide(id: number): Promise<void> {
  const { data, error } = await supabase
    .from('flirting_list')
    .update({ sender_is_read_in_noti: true, first_message_trigger: false })
    // firstMessageTrigger : false
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating is_read_in_noti', error);
    throw new Error('Error updating is_read_in_noti');
  }
}

export async function updateIsReadInNotiReceiverSide(id: number): Promise<void> {
  const { data, error } = await supabase
    .from('flirting_list')
    .update({ receiver_is_read_in_noti: true, first_message_trigger: false })
    // firstMessageTrigeer : false
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating is_read_in_noti', error);
    throw new Error('Error updating is_read_in_noti');
  }
}

export async function getUnMatchedData(myUid: string, gender: string) {
  if (!myUid) return;
  if (!gender) return;

  // 내가 보냈던 사람의 Uid
  const { data, error } = await supabase.from('flirting_list').select('receiver_uid').eq('sender_uid', myUid);
  const uidsIFlirted = data?.map((item) => {
    return item.receiver_uid;
  });

  // 내가 보냈던 사람의 Uid를 뺀 나머지 데이터
  const { data: receivedUserData } = await supabase
    .from('flirting_list')
    .select('sender_uid')
    .eq('receiver_uid', myUid);
  const uidsReceivedFlirted = receivedUserData?.map((item) => {
    return item.sender_uid;
  });

  const { data: MatchedUser1 } = await supabase
    .from('custom_users')
    .select('*, flirting_list!inner!flirting_list_sender_uid_fkey(*)');

  const { data: MatchedUser2 } = await supabase
    .from('custom_users')
    .select('*, flirting_list!inner!flirting_list_receiver_uid_fkey(*)');

  const MatchedUser = [...(MatchedUser1 || []), ...(MatchedUser2 || [])];

  // 전체회원정보 -내정보 -같은성별회원정보
  const { data: filteredUserData } = await supabase
    .from('custom_users')
    .select('*')
    .not('uid', 'in', `(${myUid})`)
    .not('avatar', 'eq', '0');

  // .not('gender', 'in', `(${gender})`);
  // console.log('filteredUserData', filteredUserData);

  const matchedUserUids = MatchedUser?.map((item: any) => item.uid) || [];

  const filteredUserDataWithoutMatchedUser =
    filteredUserData?.filter((item) => !matchedUserUids.includes(item.uid)) || [];

  const users = filteredUserDataWithoutMatchedUser;

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
    .order('created_at', { ascending: true })
    .returns<MessageType[]>();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

//채팅리스트에서 메세지 all 가져오기
export async function getMessageChatList(subscribe_room_id: string[]): Promise<any> {
  const roomIds = subscribe_room_id;

  let lastMessageArray = [];
  for (let i = 0; i < roomIds.length; i++) {
    // console.log('!!!!', i);
    let { data, error } = await supabase
      .from('message')
      .select('*')
      .eq('subscribe_room_id', roomIds[i])
      .order('created_at', { ascending: false })
      .limit(1)
      .returns<MessageType[]>()
      .maybeSingle();
    // console.log('data api', data);
    // if (error || null) {
    //   console.error('Error creating a posts data', error);
    //   throw new Error('error while fetching posts data');
    // }

    lastMessageArray.push(data);
  }
  return lastMessageArray;
}

export async function changeMessageToRead(uid: string, roomId: string): Promise<void> {
  const { error } = await supabase
    .from('message')
    .update({ is_read: true })
    .eq('is_read', false)
    .eq('subscribe_room_id', roomId)
    .neq('user_uid', uid);
  if (error || null) {
    console.error('에러 발생', error);
    throw new Error('error while fetching posts data');
  }
}

export async function postMessage(message_data: SendMessageType) {
  const { data, error } = await supabase.from('message').insert(message_data);
  // console.log(message_data);
  if (error) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
}
export async function subscribeChatList(callback: SpecificSubscribeFlirtingListCallbackType) {
  supabase
    .channel('chatlist')
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

// chat list에서 빼옴
export async function fetchLastMessages(roomIds: string[]): Promise<LastMessageArrayType> {
  let lastMessageArray = [];

  for (let i = 0; i < roomIds.length; i++) {
    const { data: getLastMessage, error } = await supabase
      .from('message')
      .select('*')
      .eq('subscribe_room_id', roomIds[i])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching last message:', error);
      throw new Error('Error fetching last message');
    }
    lastMessageArray.push(getLastMessage);
  }
  return lastMessageArray;
}

export async function untrackChatList() {
  const chatList = supabase.channel('chatlist');
  await chatList.subscribe();
  await chatList.untrack();
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
}

// navbar 메세지 알림관련 api 통신로직
export async function subscribeMessageForNotification(callback: SpecificSubscribeFlirtingListCallbackType) {
  // console.log('야!!');
  supabase
    .channel('message_notification')
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

export async function untrackMessageForNotification() {
  const chatList = supabase.channel('message_notification');
  await chatList.subscribe();
  await chatList.untrack();
}

export async function getChatListForMessageNotification(): Promise<ChatListType[]> {
  const { data, error } = await supabase
    .from('chat_room')
    .select('*, flirting_list(*,sender_uid(uid,name,avatar),receiver_uid(uid,name,avatar))')
    .order('flirting_list(created_at)', { ascending: false })
    .returns<ChatListType[]>();

  if (error || null) {
    console.error('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function getLastMessageForMessageNotification(subscribe_room_id: string[]): Promise<any> {
  const roomIds = subscribe_room_id;

  let lastMessageArray = [];
  for (let i = 0; i < roomIds.length; i++) {
    // console.log('!!!!', i);
    let { data, error } = await supabase
      .from('message')
      .select('*')
      .eq('subscribe_room_id', roomIds[i])
      .order('created_at', { ascending: false })
      .limit(1)
      .returns<MessageType[]>()
      .maybeSingle();
    // console.log('data556', data);
    // if (error || null) {
    //   console.error('Error creating a posts data', error);
    //   throw new Error('error while fetching posts data');
    // }

    lastMessageArray.push(data);
  }
  return lastMessageArray;
}
