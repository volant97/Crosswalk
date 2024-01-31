/* eslint-disable react-hooks/exhaustive-deps */
// 'use client';

import { UserState } from '@/recoil/user';
import { ChatListType } from '@/types/realTimeType';
import Image from 'next/image';
import React from 'react';
import { ChatStatusColor } from './ChatStatusColor';
import SignalOffModal from '../common/modal/SignalOffModal';
import GoToBackBtn from '../layout/GoToBackBtn';
import { useRouter } from 'next/navigation';

interface ChatProps {
  roomId: string;
  roomInfo?: ChatListType;
  getUid: UserState;
  favorableRating: number;
}

function ChatHeader({ roomId, roomInfo, getUid, favorableRating }: ChatProps) {
  return (
    <>
      <header className="sticky flex font-virgil w-full h-16 bg-white top-0 items-center border-b-2 border-solid px-6 z-50">
        <div className="mb-[25px]">
          <GoToBackBtn />
        </div>

        <div className="ml-auto">
          <SignalOffModal flirting_list_id={roomInfo?.flirting_list_id} roomId={roomId} getUid={getUid} />
        </div>
        <div className="flex items-center gap-[0.75rem] absolute top-[10px] left-12">
          {roomInfo?.flirting_list.sender_uid.uid !== getUid?.id
            ? ChatStatusColor(
                roomInfo?.flirting_list?.status,
                roomInfo?.flirting_list?.sender_uid?.avatar,
                roomInfo?.flirting_list?.sender_uid?.uid,
                roomInfo?.flirting_list?.sender_uid?.user_img
              )
            : ChatStatusColor(
                roomInfo?.flirting_list?.status,
                roomInfo?.flirting_list?.receiver_uid?.avatar,
                roomInfo?.flirting_list?.receiver_uid?.uid,

                roomInfo?.flirting_list?.receiver_uid?.user_img
              )}
          <div>
            {roomInfo?.flirting_list.sender_uid.uid === getUid?.id ? (
              <div>{roomInfo?.flirting_list.receiver_uid.name}</div>
            ) : (
              <div>{roomInfo?.flirting_list.sender_uid.name}</div>
            )}
            <div className="flex gap-[0.25rem] items-center mt-[-5px]">
              <Image
                src="/assets/figmaImg/Heart.png"
                className="w-[1rem] h-[1rem]"
                width={50}
                height={50}
                alt="호감도"
              />
              <h1 className="text-[0.875rem] text-gray-888">{favorableRating}%</h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default ChatHeader;
