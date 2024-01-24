import SignalOffModal from '@/components/common/modal/SignalOffModal';
import ChatFunction from '@/components/message/ChatFunction';
import ChatHeader from '@/components/message/ChatHeader';
import ChatRoom from '@/components/message/ChatRoom';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

function Message() {
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
      {/* Todo */}
      {/* <ChatHeader /> */}
      <div className="min-h-[calc(100dvh-12rem)] overflow-y-hidden max-h-[calc(100dvh-7rem)]">
        {/* Todo */}
        {/* <ChatRoom /> */}
        <ChatFunction />
      </div>
    </div>
  );
}

export default Message;
