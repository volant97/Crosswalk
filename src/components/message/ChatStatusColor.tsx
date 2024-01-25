import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

export function ChatStatusColor(status: string | undefined, avatar: number | undefined) {
  switch (status) {
    case 'UNREAD':
      return (
        <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'READ':
      return (
        <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'ACCEPT':
      return (
        <div className="rounded-full border-customYellow border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'DECLINE':
      return (
        <div className="rounded-full border-customRed border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'SOULMATE':
      return (
        <div className="rounded-full border-customGreen3 border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`} alt="유저 아바타 이미지" />
        </div>
      );
  }
}

export function StatusMessage(status: string | undefined) {
  switch (status) {
    case 'ACCEPT':
      return (
        <>
          <div className="flex justify-center items-center border-1 border-solid border-gray-DDD w-full py-[0.5rem] rounded-[3.125rem] text-[0.875rem]">
            <Image
              src="/assets/figmaImg/yellowLight.png"
              className="w-[1rem] h-[1rem] mr-[0.25rem]"
              width={50}
              height={50}
              alt="노란불"
            />
            신호등이 켜졌습니다. 서로에게 다가가세요!
          </div>
        </>
      );
    case 'DECLINE':
      return (
        <div className="flex justify-center items-center border-1 border-solid border-gray-DDD w-full py-[0.5rem] rounded-[3.125rem] text-[0.875rem]">
          <Image
            src="/assets/figmaImg/redLight.png"
            className="w-[1rem] h-[1rem] mr-[0.25rem]"
            width={50}
            height={50}
            alt="빨간불"
          />
          신호등이 꺼졌습니다.
        </div>
      );
  }
}
