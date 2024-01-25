/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import SignalOffModal from '@/components/common/modal/SignalOffModal';
import Page from '@/components/layout/Page';
import ChatFunction from '@/components/message/ChatFunction';
import ChatHeader from '@/components/message/ChatHeader';
import ChatRoom from '@/components/message/ChatRoom';
import { getChatList } from '@/lib/api/SupabaseApi';
import { userState } from '@/recoil/user';
import { ChatListType } from '@/types/realTimeType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRecoilState } from 'recoil';

function ChatRoomPage() {
  const pathname = usePathname();
  const roomId = pathname.split('/')[2];
  const [getUid, setGetUid] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useState<ChatListType>();

  async function data() {
    try {
      const chatList = await getChatList();

      chatList?.forEach((list) => {
        if (list.id === roomId) {
          setRoomInfo(list);
        }
      });
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }
  useEffect(() => {
    data();
  }, [roomId]);

  return (
    <Page noHeader>
      <ChatHeader roomInfo={roomInfo} getUid={getUid} />
      <ChatRoom roomId={roomId} roomInfo={roomInfo} getUid={getUid} />
    </Page>
  );
}

export default ChatRoomPage;
