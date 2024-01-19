'use client';
import SignalOffModal from '@/components/common/modal/SignalOffModal';
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
    <div className="relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black ">
      <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-between mb-[1.5rem] border-b-2 border-solid">
        <div className="flex-0 cursor-pointer">
          <Link href="/main">
            <IoIosArrowRoundBack size={25} />
          </Link>
        </div>

        <div className="ml-auto">
          <SignalOffModal />
        </div>
      </header>
      <ChatHeader roomInfo={roomInfo} getUid={getUid} />
      <div className="min-h-[calc(100dvh-12rem)] overflow-y-hidden max-h-[calc(100dvh-7rem)]">
        <ChatRoom roomInfo={roomInfo} getUid={getUid} />
        <ChatFunction />
      </div>
    </div>
  );
}

export default ChatRoomPage;
