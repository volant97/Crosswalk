/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Page from '@/components/layout/Page';
import { ChatStatusColor } from '@/components/message/ChatStatusColor';
import { getChatList, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';

import { UserState, userState } from '@/recoil/user';
import { ChatListType, LastMessageDataType, MessageType } from '@/types/realTimeType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAlertModal from '@/components/common/modal/AlertModal';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';

import useChatListModal from '@/components/common/modal/ChatListModal';

export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>();
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();
  const { openModal: openChatListModal, AlertChatListModal } = useChatListModal();

  const fetchChatListData = async () => {
    try {
      const chatListData = await getChatList();
      setChatList(chatListData);
      const roomIds = chatListData.map((item) => item.id);

      const lastMessageArray = await fetchLastMessages(roomIds);

      setLastMsg(lastMessageArray);
      // console.log('lastMsg in fetchChatListData', lastMsg);
    } catch (error) {
      console.error('error in fetchChatList', error);
      alert('서버와의 통신을 실패했습니다.2');
    }
  };

  async function fetchLastMessages(roomIds: string[]): Promise<LastMessageArrayType> {
    let lastMessageArray = [];

    for (let i = 0; i < roomIds.length; i++) {
      const { data: getLastMessage } = await supabase
        .from('message')
        .select('*')
        .eq('subscribe_room_id', roomIds[i])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      lastMessageArray.push(getLastMessage);
    }
    return lastMessageArray;
  }

  useEffect(() => {
    subscribeChatList((payload: any) => {
      // console.log('payload:', payload);
      fetchChatListData();
    });
    fetchChatListData();
    return () => {
      untrackChatList();
    };
  }, []);

  useEffect(() => {
    // console.log('lastMsg가 업데이트되었습니다');
  }, [lastMsg]);

  // console.log('chatList:', chatList);
  // console.log('lastMessage:', lastMessageData);

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
    if (status === 'ACCEPT' || status === 'SOULMATE') {
      router.push(`/chat-list/${linkId}`);
    } else return openChatListModal();
  };

  // console.log('lastMsg', lastMsg);
  // console.log('chatList', chatList);
  return (
    <Page>
      {!chatList?.length ? (
        <div className="h-screen flex items-start justify-center py-5">대화할 수 있는 방이 없어요</div>
      ) : (
        <ul className=" ">
          {chatList?.map((list, idx) => {
            if (getUid?.id === list.flirting_list.sender_uid.uid) {
              return (
                <li
                  key={idx}
                  className="py-3 flex flex-row gap-0  max-h-[68px] min-h-[] justify-between cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0] px-[20px]"
                  onClick={() => {
                    if (!lastMsg) return;
                    if (lastMsg[idx] === null) {
                      return openChatListModal();
                    } else {
                      routerLink(list.id, list.flirting_list.status);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {ChatStatusColor(
                      list.flirting_list.status,
                      list.flirting_list.receiver_uid.avatar,
                      list.flirting_list.receiver_uid.uid,
                      list.flirting_list.receiver_uid.user_img
                    )}
                  </div>
                  <div className="w-[12.5rem]">
                    <h5 className="text-black text-base font-medium">{list.flirting_list.receiver_uid.name}</h5>
                    <div className="w-full text-gray-666 text-sm font-normal overflow-hidden ">
                      {lastMsg && lastMsg[idx] !== undefined ? (
                        lastMsg[idx] !== null ? (
                          <div className="block w-full text-gray-666 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[20px]">
                            {lastMsg[idx]?.message}
                          </div>
                        ) : (
                          <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden">
                            상대방의 수락을 기다리고 있어요.
                          </div>
                        )
                      ) : (
                        <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden">
                          로딩중...
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col  justify-between items-end w-[55px]">
                    <span className="text-xs text-gray-AAA">
                      {lastMsg && lastMsg[idx] !== undefined ? (
                        lastMsg[idx] !== null ? (
                          formatDate(String(lastMsg[idx]?.created_at))
                        ) : (
                          <div className="w-full text-xs text-gray-AAA  text-ellipsis overflow-hidden">대기중</div>
                        )
                      ) : (
                        <div className="w-full text-xs text-gray-AAA text-ellipsis overflow-hidden">...</div>
                      )}
                    </span>
                    {lastMsg && lastMsg[idx] && lastMsg[idx]?.user_uid !== getUid?.id && !lastMsg[idx]?.is_read && (
                      <div className="flex justify-center items-center w-[20px] h-[20px] font-normal rounded-full bg-customGreen3 text-white text-[11px] leading-normal">
                        +1
                      </div>
                    )}
                  </div>
                </li>
              );
            } else if (getUid?.id === list.flirting_list.receiver_uid.uid) {
              return (
                <li
                  key={idx}
                  className="py-3 flex flex-row gap-0 justify-between cursor-pointer px-[20px]  max-h-[68px] transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
                  onClick={() => {
                    if (!lastMsg) return;

                    if (lastMsg[idx] === null) {
                      return openChatListModal();
                    } else {
                      routerLink(list.id, list.flirting_list.status);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {ChatStatusColor(
                      list.flirting_list.status,
                      list.flirting_list.sender_uid.avatar,
                      list.flirting_list.sender_uid.uid,
                      list.flirting_list.sender_uid.user_img
                    )}
                  </div>
                  <div className="w-[12.5rem] ">
                    <h5 className="text-black text-base font-medium ">{list.flirting_list.sender_uid.name}</h5>
                    <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
                      {lastMsg && lastMsg[idx] !== undefined ? (
                        lastMsg[idx] !== null ? (
                          <div className="block w-full text-gray-666 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[20px]">
                            {lastMsg[idx]?.message}
                          </div>
                        ) : (
                          <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">
                            회원님의 수락을 기다리고 있어요.
                          </div>
                        )
                      ) : (
                        <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">로딩중...</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end w-[55px]">
                    <span className="text-xs text-gray-AAA">
                      {lastMsg && lastMsg[idx] !== undefined ? (
                        lastMsg[idx] !== null ? (
                          formatDate(String(lastMsg[idx]?.created_at))
                        ) : (
                          <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">
                            대기중
                          </div>
                        )
                      ) : (
                        <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">
                          ...
                        </div>
                      )}
                    </span>
                    {lastMsg && lastMsg[idx] && lastMsg[idx]?.user_uid !== getUid?.id && !lastMsg[idx]?.is_read && (
                      <div className="flex justify-center items-center w-[20px] h-[20px] font-normal rounded-full bg-customGreen3 text-white text-[11px] leading-normal">
                        +1
                      </div>
                    )}
                  </div>
                </li>
              );
            }
          })}
        </ul>
      )}
      {AlertModal()}
      {AlertChatListModal()}
    </Page>
  );
}
