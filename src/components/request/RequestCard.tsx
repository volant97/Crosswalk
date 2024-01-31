import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import DeclineBtn from './btn/DeclineBtn';
import AcceptBtn from './btn/AcceptBtn';
// 여기 폴더명 변경했음

type Props = {
  listId: number;
  senderId: string;
  avatar: number;
  senderName: string;
  age: number;
  message: string;
};

function RequestCard({ listId, senderId, avatar, senderName, age, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-[12px] w-[320px] p-[16px] font-pretendard bg-gray-FA rounded-[16px]">
      <Link
        className="flex items-center gap-[8px] self-stretch h-[42px] cursor-pointer"
        href={`/other-person-profile/${senderId}`}
      >
        <div className="relative flex justify-center items-center w-[42px] h-[42px] rounded-full">
          <Image
            className="rounded-full object-cover"
            src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`}
            alt="avatar"
            width={42}
            height={42}
          />
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <div className="flex items-end gap-[4px]">
            <p className="text-[16px] font-[500] leading-[16px]">{senderName}</p>
            <p className="text-[14px] font-[400] text-gray-999 leading-[14px]">{age}</p>
          </div>
          <p className="text-[14px] font-[400] text-gray-666 leading-[20px] capitalize">{message}</p>
        </div>
      </Link>
      <div className="flex items-start w-[200px] h-[32px] gap-[8px]">
        <DeclineBtn listId={listId} />
        <AcceptBtn listId={listId} />
      </div>
    </div>
  );
}

export default RequestCard;
