'use client';
import Page from '@/components/layout/Page';
import { ChatStatusColor } from '@/components/message/ChatStatusColor';
import {
  getChatList,
  getMessage,
  getMessageChatList,
  subscribeChatList,
  subscribeChatRoom,
  untrackChatList
} from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { LastMessageState } from '@/recoil/lastMessageData';
import { UserState, userState } from '@/recoil/user';
import { ChatListType, LastMessageDataType, MessageType } from '@/types/realTimeType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAlertModal from '@/components/common/modal/AlertModal';

type lastMessageArray = ({
  congratulations_message: number;
  created_at: string;
  id: number;
  is_read: boolean;
  message: string;
  total_chat_count: number;
  user_uid: string;
} | null)[];

export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  const [lastMessageData, setLastMessageData] = useRecoilState<LastMessageDataType>(LastMessageState);
  const [lastMsg, setLastMsg] = useState<lastMessageArray>();
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  /* TODO: 
  1. ChatRoom에서 각각 Recoil에(배열타입) 마지막 메세지 데이터(객체타입)를 담는다. 
  2. chat-list/page.tsx에서 Recoil에 저장되어 있는 마지막 메세지 데이터들을 꺼내 map을 돌려 화면에 뿌려준다.
  */

  const fetchChatListData = async () => {
    try {
      const chatListData = await getChatList();
      console.log('chatListData', chatListData);
      setChatList(chatListData);
      const roomIds = chatListData.map((item) => {
        return item.id;
      });
      // const getLastMessage = await getMessageChatList(roomIds);
      let lastMessageArray = [];

      for (let i = 0; i < roomIds.length; i++) {
        const { data: getLastMessage } = await supabase
          .from('message')
          .select('*')
          .eq('subscribe_room_id', roomIds[i])
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        lastMessageArray.push(getLastMessage);
      }
      setLastMsg(lastMessageArray);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.2');
    }
  };

  // ------------
  // export async function getMessageChatList(subscribe_room_id: string[]): Promise<any> {
  //   const roomIds = subscribe_room_id;

  //   let lastMessageArray = [];
  //   for (let i = 0; i < roomIds.length; i++) {
  //     console.log('!!!!', i);
  //     let { data, error } = await supabase
  //       .from('message')
  //       .select('*')
  //       .eq('subscribe_room_id', roomIds[i])
  //       .order('created_at', { ascending: false })
  //       .limit(1)
  //       .returns<MessageType[]>()
  //       .single();
  //     console.log('data api', data);
  //     // if (error || null) {
  //     //   console.error('Error creating a posts data', error);
  //     //   throw new Error('error while fetching posts data');
  //     // }

  //     lastMessageArray.push(data);
  //   }
  //   return lastMessageArray;
  // }
  // ------------

  // async function lastData(subscribe_room_id: string) {
  //   try {
  //     if (!data) {
  //       return;
  //     } else {
  //       const messageData = await getMessage(subscribe_room_id);
  //       console.log('messageData', messageData);
  //       // const data = await getLastMessageWithTime(subscribe_room_id);
  //       // console.log('data:', data);
  //       // const test = data.lastMessage;
  //       // setLastMessage((prev: any) => [...prev, test]);
  //     }
  //   } catch (error: any) {
  //     console.log('error:', error.message);
  //     alert('서버와의 통신을 실패했습니다.?');
  //   }
  // }

  // subscribeChatList를 통해 신규 메세지가 도착하면 해당 대화방의 마지막 메세지를 가져오는 lastData 함수 호출. 또한 chatList가 변경될때마다 각 대화방의 마지막 메세지를 가져오도록 함
  // useEffect(() => {
  //   subscribeChatList((payload: any) => {
  //     data();
  //     const subscribeRoomId = payload.new.flirting_list.id;
  //     lastData(subscribeRoomId);
  //   });
  //   data();

  //   return () => {
  //     untrackChatList();
  //     // chatListSubscription.unsubscribe(); // 구독 해제
  //   };
  // }, [getUid?.id]);

  useEffect(() => {
    subscribeChatList((payload: any) => {
      console.log('payload:', payload);
      // 채팅방 목록 가져오기
      fetchChatListData();
      // 메세지 데이터 가져오기

      // fetchMessageData();
      // lastData(subscribeRoomId);

      // 새로운 메시지가 도착했을 때 마지막 메시지 상태를 업데이트
      // setLastMessage((prevMessages) => [...prevMessages, payload.new]);
      // console.log('New message arrived:', payload.new);
      // console.log('Updated lastMessage state:', lastMessage);
    });

    fetchChatListData();

    return () => {
      untrackChatList();
    };
  }, [getUid?.id]);

  useEffect(() => {
    if (chatList) {
      // fetchChatListData();
    } else {
      return;
    }
  }, [chatList]);

  console.log('chatList:', chatList);
  console.log('lastMessage:', lastMessageData);

  // const getLastMessageTime = async (subscribeRoomId: string) => {
  //   try {
  //     const { time } = await getLastMessageWithTime(subscribeRoomId);
  //     return time;
  //   } catch (error) {
  //     console.error('Error fetching last message time', error);
  //     return '';
  //   }
  // };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 3) {
      const distanceString = formatDistanceToNow(d, { addSuffix: true, locale: ko, includeSeconds: true });
      return distanceString.replace(/^약\s*/, ''); // "약" 부분을 정규식을 사용하여 제거
    }
    return format(d, 'PPP EEE p', { locale: ko });
  };

  const routerLink = (linkId: string, status: string) => {
    if (status === 'ACCEPT') {
      router.push(`/chat-list/${linkId}`);
    } else return openModal('신호 대기중입니다!');
  };

  console.log('lastMsg', lastMsg);

  return (
    <Page noNavBar>
      {!chatList ? (
        <div className="h-screen flex items-center justify-center">대화할수있는 방이 없어요</div>
      ) : (
        <ul className="px-5">
          {chatList?.map((list, idx) => {
            if (getUid?.id === list.flirting_list.sender_uid.uid) {
              return (
                <li
                  key={idx}
                  className="py-3 flex flex-row gap-4 justify-between cursor-pointer"
                  onClick={() => {
                    routerLink(list.id, list.flirting_list.status);
                  }}
                >
                  <div className="flex items-center">
                    {ChatStatusColor(list.flirting_list.status, list.flirting_list.receiver_uid.avatar)}
                  </div>
                  <div className="w-[12.5rem] ml-[-60px]">
                    <h5 className="text-black text-base font-medium">{list.flirting_list.receiver_uid.name}</h5>
                    <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
                      {lastMsg && lastMsg[idx] ? lastMsg[idx]?.message : <div>상대방의 수락을 기다리고 있어요 ...</div>}
                      {/* {lastMsg ? lastMsg[idx]?.message : <div>로딩중</div>} */}
                      {/* {lastMsg[idx] ? lastMsg[idx].message : <div>로딩중<div/>} */}
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.message ||
                        list.flirting_list.flirting_message} */}
                      {/* ---아래함수 */}
                      {/* {lastMessage
                        ?.filter((msg) => msg.subscribe_room_id === list.id)
                        .map((msg) => msg.message)
                        .pop() || list.flirting_list.flirting_message} */}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-AAA">
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at
                        ? formatDate(String(lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at))
                        : formatDate(String(list.flirting_list.created_at))} */}
                      {/* ---아래함수 */}
                      {lastMsg && lastMsg[idx] ? (
                        formatDate(String(lastMsg[idx]?.created_at))
                      ) : (
                        <div className="text-xs text-gray-AAA">대기중</div>
                      )}
                      {/* {formatDate(
                        String(
                          lastMessage
                            ?.filter((msg) => msg.subscribe_room_id === list.id)
                            .map((msg) => msg.created_at)
                            .pop() || list.flirting_list.created_at
                        )
                      )} */}
                    </span>
                    <div></div>
                  </div>
                </li>
              );
            } else if (getUid?.id === list.flirting_list.receiver_uid.uid && list.flirting_list.status === 'ACCEPT') {
              return (
                <li
                  key={idx}
                  className="py-3 flex flex-row gap-4 justify-between cursor-pointer"
                  onClick={() => {
                    router.push(`/chat-list/${list.id}`);
                  }}
                >
                  <div className="flex items-center">
                    {ChatStatusColor(list.flirting_list.status, list.flirting_list.sender_uid.avatar)}
                  </div>
                  <div className="w-[12.5rem] ml-[-60px]">
                    <h5 className="text-black text-base font-medium">{list.flirting_list.sender_uid.name}</h5>
                    <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
                      {lastMsg && lastMsg[idx] ? lastMsg[idx]?.message : <div>상대방의 수락을 기다리고 있어요 ...</div>}
                      {/* {lastMsg ? lastMsg[idx]?.message : <div>로딩중</div>} */}
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.message ||
                        list.flirting_list.flirting_message} */}
                      {/* ---아래함수 */}
                      {/* {lastMessage
                        ?.filter((msg) => msg.subscribe_room_id === list.id)
                        .map((msg) => msg.message)
                        .pop() || list.flirting_list.flirting_message} */}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-AAA">
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at
                        ? formatDate(String(lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at))
                        : formatDate(String(list.flirting_list.created_at))} */}
                      {/* ---아래함수 */}
                      {lastMsg && lastMsg[idx] ? (
                        formatDate(String(lastMsg[idx]?.created_at))
                      ) : (
                        <div className="text-xs text-gray-AAA">대기중</div>
                      )}

                      {/* {formatDate(
                        String(
                          lastMessage
                            ?.filter((msg) => msg.subscribe_room_id === list.id)
                            .map((msg) => msg.created_at)
                            .pop() || list.flirting_list.created_at
                        )
                      )} */}
                    </span>
                    <div></div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
      {AlertModal()}
    </Page>
  );
}
