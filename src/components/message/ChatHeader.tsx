import { UserState, userState } from '@/recoil/user';
import { ChatListType } from '@/types/realTimeType';
import Image from 'next/image';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { ChatStatusColor } from './ChatStatusColor';

interface ChatProps {
  roomInfo?: ChatListType;
  getUid: UserState;
}

function ChatHeader({ roomInfo, getUid }: ChatProps) {
  return (
    <div className="flex items-center gap-[0.75rem] absolute top-[10px] left-[70px]">
      {ChatStatusColor(roomInfo?.flirting_list?.status, roomInfo?.flirting_list?.receiver_uid?.avatar)}
      <div>
        {roomInfo?.flirting_list.sender_uid.uid === getUid?.id ? (
          <div>{roomInfo?.flirting_list.sender_uid.name}</div>
        ) : (
          <div>{roomInfo?.flirting_list.receiver_uid.name}</div>
        )}
        <div className="flex gap-[0.25rem] items-center mt-[-5px]">
          <Image src="/assets/figmaImg/Heart.png" className="w-[1rem] h-[1rem]" width={50} height={50} alt="호감도" />
          <h1 className="text-[0.875rem] text-gray-888">10%</h1>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
