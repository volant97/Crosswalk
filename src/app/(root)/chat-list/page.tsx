'use client';
import Page from '@/components/layout/Page';
import { ChatStatusColor } from '@/components/message/ChatStatusColor';
import { getChatList, getLastMessageWithTime, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
import { UserState, userState } from '@/recoil/user';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  const [lastMessage, setLastMessage] = useState<MessageType[]>([]);
  const router = useRouter();
  async function data() {
    try {
      const data = await getChatList();

      setChatList(data);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }
  // async function lastData(subscribe_room_id: string) {
  //   try {
  //     const data = await getLastMessage(subscribe_room_id);
  //     console.log('data:', data);
  //     console.log('test:', data[0]);
  //     const test = data[0];
  //     setLastMessage((prev: any) => [...prev, test]);
  //   } catch (error) {
  //     alert('서버와의 통신을 실패했습니다.');
  //   }
  // }

  async function lastData(subscribe_room_id: string) {
    try {
      const data = await getLastMessageWithTime(subscribe_room_id);
      console.log('data:', data);
      const test = data.lastMessage;
      setLastMessage((prev: any) => [...prev, test]);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.?');
    }
  }

  // useEffect(() => {
  //   subscribeChatList((payload: any) => {
  //     data();
  //   });
  //   data();
  //   // 컴포넌트 언마운트 시에 구독 해제
  //   return () => {
  //     untrackChatList();
  //   };
  // }, [getUid?.id]);

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
      data();
      const subscribeRoomId = payload.new.flirting_list.id;
      lastData(subscribeRoomId);
      // 새로운 메시지가 도착했을 때 마지막 메시지 상태를 업데이트
      setLastMessage((prevMessages) => [...prevMessages, payload.new]);
      console.log('New message arrived:', payload.new);
      console.log('Updated lastMessage state:', lastMessage);
    });
    data();

    return () => {
      untrackChatList();
    };
  }, [getUid?.id]);

  useEffect(() => {
    chatList?.forEach((item) => {
      lastData(item.id);
    });
  }, [chatList]);

  console.log('chatList:', chatList);
  console.log('lastMessage:', lastMessage);
  // useEffect(() => {
  //   chatList?.map((item, idx) => {});
  //   lastData();
  // }, []);

  // const getLastMessageTime = async (subscribeRoomId: string) => {
  //   try {
  //     const { time } = await getLastMessageWithTime(subscribeRoomId);
  //     return time;
  //   } catch (error) {
  //     console.error('Error fetching last message time', error);
  //     return '';
  //   }
  // };

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
    } else return alert('신호 대기 중 입니다!');
  };

  // const renderLastMessageTime = (subscribeRoomId: string) => {
  //   const lastMessageData = lastMessage?.find((msg) => msg?.subscribe_room_id === subscribeRoomId);
  //   if (lastMessageData) {
  //     return formatDate(lastMessageData.created_at);
  //   }
  //   return '';
  // };

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
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.message ||
                        list.flirting_list.flirting_message} */}
                      {lastMessage
                        ?.filter((msg) => msg.subscribe_room_id === list.id)
                        .map((msg) => msg.message)
                        .pop() || list.flirting_list.flirting_message}
                      {/* {lastMessage[0] && list.id === lastMessage[0]?.subscribe_room_id
                        ? lastMessage[0]?.message
                        : list.flirting_list.flirting_message} */}
                      {/* {list.flirting_list.flirting_message} */}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    {/* <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span> */}
                    {/* <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span> */}
                    <span className="text-xs text-gray-AAA">
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at
                        ? formatDate(String(lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at))
                        : formatDate(String(list.flirting_list.created_at))} */}
                      {formatDate(
                        String(
                          lastMessage
                            ?.filter((msg) => msg.subscribe_room_id === list.id)
                            .map((msg) => msg.created_at)
                            .pop() || list.flirting_list.created_at
                        )
                      )}
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
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.message ||
                        list.flirting_list.flirting_message} */}
                      {lastMessage
                        ?.filter((msg) => msg.subscribe_room_id === list.id)
                        .map((msg) => msg.message)
                        .pop() || list.flirting_list.flirting_message}
                      {/* {list.flirting_list.flirting_message} */}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    {/* <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span> */}
                    {/* <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span> */}
                    <span className="text-xs text-gray-AAA">
                      {/* {lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at
                        ? formatDate(String(lastMessage?.find((msg) => msg?.subscribe_room_id === list.id)?.created_at))
                        : formatDate(String(list.flirting_list.created_at))} */}
                      {formatDate(
                        String(
                          lastMessage
                            ?.filter((msg) => msg.subscribe_room_id === list.id)
                            .map((msg) => msg.created_at)
                            .pop() || list.flirting_list.created_at
                        )
                      )}
                    </span>
                    <div></div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
    </Page>
  );
}
