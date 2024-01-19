import { Avatar } from '@nextui-org/react';
import React from 'react';

export function ChatStatusColor(status: string | undefined, avatar: number | undefined) {
  switch (status) {
    case 'UNREAD':
      return (
        <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'READ':
      return (
        <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'ACCEPT':
      return (
        <div className="rounded-full border-customYellow border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.png`} alt="유저 아바타 이미지" />
        </div>
      );
    case 'DECLINE':
      return (
        <div className="rounded-full border-customRed border-2 p-[0.2rem]">
          <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.png`} alt="유저 아바타 이미지" />
        </div>
      );
  }
}
