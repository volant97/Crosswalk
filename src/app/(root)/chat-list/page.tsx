/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Page from '@/components/layout/Page';
import { fetchLastMessages, getChatList, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
import { UserState, userState } from '@/recoil/user';
import { ChatListType } from '@/types/realTimeType';
import useAlertModal from '@/components/common/modal/AlertModal';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';
import useChatListModal from '@/components/common/modal/ChatListModal';
import { RenderListItem } from '@/components/message/RenderListItem';

// 캐싱처리
let cachedData = [] as LastMessageArrayType;

export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>(cachedData);
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

  // if (!lastMsg) {
  //   return null;
  // }

  return (
    <Page>
      {!chatList?.length ? (
        <div className="h-screen flex items-start justify-center py-7">대화할 수 있는 방이 없어요</div>
      ) : (
        <ul>
          {chatList?.map((list, idx) => (
            <RenderListItem list={list} idx={idx} lastMsg={lastMsg} />
          ))}
        </ul>
      )}
      {AlertModal()}
      {AlertChatListModal()}
    </Page>
  );
}
