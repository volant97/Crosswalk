/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { postMessage } from '@/lib/api/SupabaseApi';
import { UserState } from '@/recoil/user';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { StatusMessage } from './ChatStatusColor';
import { ConvertedDate, DisplayDateTime, GetCurrentTime } from './ChatDate';
import { useRouter } from 'next/navigation';
import useCongratModal from '../common/modal/CongratModal';

interface ChatProps {
  roomId: string;
  roomInfo?: ChatListType;
  getUid: UserState;
  messageData: MessageType[];
}

function ChatRoom({ roomId, roomInfo, getUid, messageData }: ChatProps) {
  const router = useRouter();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { AlertCongratModal } = useCongratModal();

  const routerLink = (uid: string | undefined) => {
    if (uid !== undefined) {
      router.push(`/${uid}`);
    }
  };

  useEffect(() => {
    // 새로운 채팅이 들어올 떄 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageData]);

  if (!roomInfo?.flirting_list.sender_uid.avatar) return;

  return (
    <div className="flex flex-col justify-center h-[calc[100dvh-64px-62px]] py-[24px]">
      <div
        ref={chatContainerRef}
        className="relative flex flex-col items-end w-full overflow-y-auto scrollbar-hide px-6 "
      >
        {StatusMessage(roomInfo?.flirting_list.status)}

        {messageData?.map((data, idx) => {
          const nextData = messageData[idx + 1];
          return data.user_uid === getUid?.id ? (
            <>
              {idx === 0 ? DisplayDateTime(String(data.created_at)) : null}
              <div className=" flex justify-end items-end gap-[0.38rem]" key={idx}>
                <h1 className="text-[0.75rem] text-gray-999 whitespace-nowrap">
                  {GetCurrentTime(String(data.created_at))}
                </h1>
                <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-bl-[1.8rem] max-w-48">
                    <h1 className="font-medium break-all">{data.message}</h1>
                  </div>
                </div>
              </div>
              {ConvertedDate(String(data.created_at), idx) !== ConvertedDate(String(nextData?.created_at), idx)
                ? DisplayDateTime(String(nextData?.created_at))
                : null}
            </>
          ) : (
            <>
              {idx === 0 ? DisplayDateTime(String(data.created_at)) : null}
              <div className="mr-auto " key={idx}>
                <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                  {roomInfo?.flirting_list.sender_uid.uid !== getUid?.id ? (
                    roomInfo?.flirting_list.status === 'SOULMATE' ? (
                      <Avatar
                        className="cursor-pointer"
                        onClick={() => {
                          routerLink(roomInfo?.flirting_list.sender_uid.uid);
                        }}
                        size="sm"
                        src={roomInfo?.flirting_list.sender_uid.user_img}
                        alt="유저 이미지"
                      />
                    ) : (
                      <Avatar
                        className="cursor-pointer"
                        onClick={() => {
                          routerLink(roomInfo?.flirting_list.sender_uid.uid);
                        }}
                        size="sm"
                        src={`/assets/avatar/avatar-circle/avatar${roomInfo?.flirting_list.sender_uid.avatar}-circle.png`}
                        alt="유저 아바타 이미지"
                      />
                    )
                  ) : roomInfo?.flirting_list.status === 'SOULMATE' ? (
                    <Avatar
                      className="cursor-pointer"
                      onClick={() => {
                        routerLink(roomInfo?.flirting_list.receiver_uid.uid);
                      }}
                      size="sm"
                      src={roomInfo?.flirting_list.receiver_uid.user_img}
                      alt="유저 아바타 이미지"
                    />
                  ) : (
                    <Avatar
                      className="cursor-pointer"
                      onClick={() => {
                        routerLink(roomInfo?.flirting_list.receiver_uid.uid);
                      }}
                      size="sm"
                      src={`/assets/avatar/avatar-circle/avatar${roomInfo?.flirting_list.receiver_uid.avatar}-circle.png`}
                      alt="유저 아바타 이미지"
                    />
                  )}
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-gray-F6 rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem] max-w-48">
                    <h1 className="font-medium break-all">{data.message}</h1>
                  </div>
                  <h1 className="text-[0.75rem] text-gray-999 mt-[20px] whitespace-nowrap">
                    {GetCurrentTime(String(data.created_at))}
                  </h1>
                </div>
              </div>

              {ConvertedDate(String(data.created_at), idx) !== ConvertedDate(String(nextData?.created_at), idx)
                ? DisplayDateTime(String(nextData?.created_at))
                : null}
            </>
          );
        })}
      </div>
      {AlertCongratModal()}
    </div>
  );
}

export default ChatRoom;
