/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Page from '@/components/layout/Page';
import { ChatStatusColor } from '@/components/message/ChatStatusColor';
import { fetchLastMessages, getChatList, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { UserState, userState } from '@/recoil/user';
import { ChatListType, LastMessageDataType, MessageType } from '@/types/realTimeType';
import useAlertModal from '@/components/common/modal/AlertModal';
import { useRouter } from 'next/navigation';
import React, { cache, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { LastMessageArrayType } from '@/types/lastMessageArrayType';
import useChatListModal from '@/components/common/modal/ChatListModal';
import { formatDate } from '@/utils/useFormatDate';
import { RenderListItem } from '@/utils/RenderListItem';
// import { renderListItem } from '@/utils/renderListItem';
let cachedData = [] as LastMessageArrayType;
export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>(cachedData);
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();
  const { openModal: openChatListModal, AlertChatListModal } = useChatListModal();

  const fetchChatListData = async () => {
    try {
      const chatListData = await getChatList();
      setChatList(chatListData);
      const roomIds = chatListData.map((item) => item.id);
      const lastMessageArray = await fetchLastMessages(roomIds);
      cachedData = lastMessageArray;
      setLastMsg(lastMessageArray);
      // console.log('lastMsg in fetchChatListData', lastMsg);
    } catch (error) {
      console.error('error in fetchChatList', error);
      alert('서버와의 통신을 실패했습니다.');
    }
  };

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

  // const renderListItem = (list: ChatListType, idx: number, lastMsg: LastMessageArrayType) => {
  //   const { openModal: openChatListModal, AlertChatListModal } = useChatListModal();
  //   const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  //   const [chatList, setChatList] = useState<ChatListType[]>();
  //   // const [lastMsg, setLastMsg] = useState<LastMessageArrayType>();
  //   const isSender = getUid?.id === list.flirting_list.sender_uid.uid;
  //   const otherUser = isSender ? list.flirting_list.receiver_uid : list.flirting_list.sender_uid;
  //   const statusMessage = isSender ? '상대방의 수락을 기다리고 있어요.' : '회원님의 수락을 기다리고 있어요.';
  //   const router = useRouter();

  //   const routerLink = (linkId: string, status: string) => {
  //     if (status === 'ACCEPT' || status === 'SOULMATE') {
  //       router.push(`/chat-list/${linkId}`);
  //     } else return openChatListModal();
  //   };

  //   return (
  //     <li
  //       key={idx}
  //       className={`py-3 flex flex-row gap-0 justify-between cursor-pointer px-[20px] max-h-[68px] transition duration-300 ease-in-out hover:bg-[#FFD1E0] ${
  //         isSender ? '' : 'px-[20px]'
  //       } `}
  //       onClick={() => {
  //         if (!lastMsg) return;
  //         if (lastMsg[idx] === null) {
  //           return openChatListModal();
  //         } else {
  //           routerLink(list.id, list.flirting_list.status);
  //         }
  //       }}
  //     >
  //       <div className="flex items-center">
  //         {ChatStatusColor(
  //           list.flirting_list.status,
  //           isSender ? list.flirting_list.receiver_uid.avatar : list.flirting_list.sender_uid.avatar,
  //           otherUser.uid,
  //           otherUser.user_img
  //         )}
  //       </div>
  //       <div className="w-[12.5rem]">
  //         <h5 className="text-black text-base font-medium">{otherUser.name}</h5>
  //         <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden">
  //           {lastMsg && lastMsg[idx] !== undefined ? (
  //             lastMsg[idx] !== null ? (
  //               <div className="block w-full text-gray-666 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[20px]">
  //                 {lastMsg[idx]?.message}
  //               </div>
  //             ) : (
  //               <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">{statusMessage}</div>
  //             )
  //           ) : (
  //             <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">로딩중...</div>
  //           )}
  //         </div>
  //       </div>
  //       <div className="flex flex-col justify-between items-end w-[55px]">
  //         <span className="text-xs text-gray-AAA">
  //           {lastMsg && lastMsg[idx] !== undefined ? (
  //             lastMsg[idx] !== null ? (
  //               formatDate(String(lastMsg[idx]?.created_at))
  //             ) : (
  //               <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">대기중</div>
  //             )
  //           ) : (
  //             <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">...</div>
  //           )}
  //         </span>
  //         {lastMsg && lastMsg[idx] && lastMsg[idx]?.user_uid !== getUid?.id && !lastMsg[idx]?.is_read && (
  //           <div className="flex justify-center items-center w-[20px] h-[20px] font-normal rounded-full bg-customGreen3 text-white text-[11px] leading-normal">
  //             +1
  //           </div>
  //         )}
  //       </div>
  //     </li>
  //   );
  // };

  if (!lastMsg) {
    return null;
  }

  return (
    <Page>
      {!chatList?.length ? (
        <div className="h-screen flex items-start justify-center py-7">대화할 수 있는 방이 없어요</div>
      ) : (
        <ul>
          {/* {chatList?.map((list, idx) => RenderListItem(list, idx, lastMsg))} */}
          {chatList?.map((list, idx) => (
            <RenderListItem list={list} idx={idx} lastMsg={lastMsg} />
          ))}
          {/* {chatList?.map((list, idx) => {
            const isSender = getUid?.id === list.flirting_list.sender_uid.uid;
            const otherUser = isSender ? list.flirting_list.receiver_uid : list.flirting_list.sender_uid;
            const statusMessage = isSender ? '상대방의 수락을 기다리고 있어요.' : '회원님의 수락을 기다리고 있어요.';

            return (
              <li
                key={idx}
                className={`py-3 flex flex-row gap-0 justify-between cursor-pointer px-[20px] max-h-[68px] transition duration-300 ease-in-out hover:bg-[#FFD1E0] ${
                  isSender ? '' : 'px-[20px]'
                } `}
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
                    isSender ? list.flirting_list.receiver_uid.avatar : list.flirting_list.sender_uid.avatar,
                    otherUser.uid,
                    otherUser.user_img
                  )}
                </div>
                <div className="w-[12.5rem]">
                  <h5 className="text-black text-base font-medium">{otherUser.name}</h5>
                  <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden">
                    {lastMsg && lastMsg[idx] !== undefined ? (
                      lastMsg[idx] !== null ? (
                        <div className="block w-full text-gray-666 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[20px]">
                          {lastMsg[idx]?.message}
                        </div>
                      ) : (
                        <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">
                          {statusMessage}
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
                      <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">...</div>
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
          })} */}
        </ul>
      )}
      {AlertModal()}
      {AlertChatListModal()}
    </Page>
  );
}
