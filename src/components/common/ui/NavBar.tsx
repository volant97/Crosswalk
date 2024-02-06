'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  getChatListForMessageNotification,
  getLastMessageForMessageNotification,
  subscribeMessageForNotification,
  untrackMessageForNotification
} from '@/lib/api/SupabaseApi';
import HomeIcon from './HomeIcon';
import RequestIcon from './RequestIcon';
import ChatListIcon from './ChatListIcon';
import MyProfileIcon from './MyProfileIcon';
import type { LastMessageArrayType } from '@/types/lastMessageArrayType';
import type { ChatListType } from '@/types/realTimeType';

function NavBar() {
  const pathname = usePathname();
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>();

  const fetchChatListDataForMessageNotification = async () => {
    try {
      const chatListDataMessageNotification = await getChatListForMessageNotification();
      setChatList(chatListDataMessageNotification);
      const roomIds = chatListDataMessageNotification.map((item: any) => item.id);
      const lastMessageArray = await getLastMessageForMessageNotification(roomIds);
      setLastMsg(lastMessageArray);
    } catch (error) {
      console.error('fetchChatList에서 에러가 발생하였습니다.', error);
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    subscribeMessageForNotification((payload: any) => {
      fetchChatListDataForMessageNotification();
    });
    fetchChatListDataForMessageNotification();
    return () => {
      untrackMessageForNotification();
    };
  }, []);

  const active = `font-bold 
     bg-customGreen2 
    rounded-[0.375rem]`;

  return (
    <nav
      className={`sticky bottom-0  h-[8.8dvh] bg-white shadow-navBarShadow flex justify-center items-start pt-[1.6dvh] px-6 z-50`}
    >
      <HomeIcon pathname={pathname} active={active} />
      <RequestIcon pathname={pathname} active={active} />
      <ChatListIcon pathname={pathname} active={active} lastMsg={lastMsg} />
      <MyProfileIcon pathname={pathname} active={active} />
    </nav>
  );
}

export default NavBar;
