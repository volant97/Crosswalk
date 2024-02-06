/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { fetchLastMessages, getChatList, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
import Page from '@/components/layout/Page';
import useAlertModal from '@/components/common/modal/AlertModal';
import useChatListModal from '@/components/common/modal/ChatListModal';
import { RenderListItem } from '@/components/message/RenderListItem';
import type { ChatListType } from '@/types/realTimeType';
import type { LastMessageArrayType } from '@/types/lastMessageArrayType';

// 캐싱처리
let cachedData = [] as LastMessageArrayType;

export default function ChatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>(cachedData);
  const { AlertModal } = useAlertModal();
  const { AlertChatListModal } = useChatListModal();

  const fetchChatListData = async () => {
    try {
      const chatListData = await getChatList();
      setChatList(chatListData);
      const roomIds = chatListData.map((item) => item.id);
      const lastMessageArray = await fetchLastMessages(roomIds);
      cachedData = lastMessageArray;
      setLastMsg(lastMessageArray);
    } catch (error) {
      console.error('error in fetchChatList', error);
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    subscribeChatList((payload: any) => {
      fetchChatListData();
    });
    fetchChatListData();
    return () => {
      untrackChatList();
    };
  }, []);

  return (
    <Page>
      {!chatList?.length ? (
        <div className="h-screen flex items-start justify-center py-7">대화할 수 있는 방이 없어요</div>
      ) : (
        <ul>
          {chatList?.map((list, idx) => (
            <RenderListItem list={list} idx={idx} lastMsg={lastMsg} key={idx} />
          ))}
        </ul>
      )}
      {AlertModal()}
      {AlertChatListModal()}
    </Page>
  );
}
