'use client';

import { getMessage, postMessage, subscribeChatRoom, untrackChatRoom } from '@/lib/api/SupabaseApi';
import { UserState } from '@/recoil/user';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { Avatar } from '@nextui-org/react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { StatusMessage } from './ChatStatusColor';
import { ConvertedDate, DisplayDateTime, GetCurrentTime } from './ChatDate';

interface ChatProps {
  roomId: string;
  roomInfo?: ChatListType;
  getUid: UserState;
}

function ChatRoom({ roomId, roomInfo, getUid }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (roomInfo?.flirting_list.status === 'ACCEPT') {
      const sendData = {
        subscribe_room_id: roomId,
        user_uid: getUid?.id,
        message: inputValue,
        congratulations_message: 0,
        total_chat_count: 0,
        is_read: false
      };

      if (sendData.message === '') {
        return alert('메세지를 입력해주세요');
      }
      await postMessage(sendData);
      await setInputValue('');
    }
  };
  async function getData(subscribe_room_id: string) {
    try {
      const getMessageData = await getMessage(subscribe_room_id);
      setMessageData(getMessageData);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }

  useEffect(() => {
    // 컴포넌트 마운트 시에 구독
    subscribeChatRoom(roomId, (payload: any) => {
      getData(roomId);
    });

    getData(roomId);
    // 컴포넌트 언마운트 시에 구독 해제
    return () => {
      untrackChatRoom(roomId);
    };
  }, [getUid, roomId]);

  useEffect(() => {
    // 새로운 채팅이 들어올 떄 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageData]);
  console.log(roomInfo?.flirting_list.sender_uid.uid);
  console.log(roomInfo?.flirting_list.sender_uid.uid === getUid?.id);
  console.log(getUid?.id);

  return (
    <>
      <div
        ref={chatContainerRef}
        className="relative flex flex-col items-end w-full h-[45.5rem]  overflow-y-auto scrollbar-hide px-6"
      >
        {StatusMessage(roomInfo?.flirting_list.status)}

        {messageData?.map((data, idx) => {
          const nextData = messageData[idx + 1];
          return data.user_uid === getUid?.id ? (
            <>
              {idx === 0 ? DisplayDateTime(data.created_at) : null}
              <div className=" flex justify-end items-end gap-[0.38rem]" key={idx}>
                <h1 className="text-[0.75rem] text-gray-999 whitespace-nowrap">{GetCurrentTime(data.created_at)}</h1>
                <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-bl-[1.8rem] max-w-[15rem]">
                    <h1 className="font-medium break-all">{data.message}</h1>
                  </div>
                </div>
              </div>
              {ConvertedDate(data.created_at, idx) !== ConvertedDate(nextData?.created_at, idx)
                ? DisplayDateTime(nextData?.created_at)
                : null}
            </>
          ) : (
            <>
              {idx === 0 ? DisplayDateTime(data.created_at) : null}
              <div className="mr-auto " key={idx}>
                <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                  <Avatar
                    size="sm"
                    src={`/assets/avatar/avatar-circle/avatar${roomInfo?.flirting_list.receiver_uid.avatar}-circle.png`}
                    alt="유저 아바타 이미지"
                  />
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-gray-F6 rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem] max-w-[15rem]">
                    <h1 className="font-medium break-all">{data.message}</h1>
                  </div>
                  <h1 className="text-[0.75rem] text-gray-999 mt-[20px] whitespace-nowrap">
                    {GetCurrentTime(data.created_at)}
                  </h1>
                </div>
              </div>

              {ConvertedDate(data.created_at, idx) !== ConvertedDate(nextData?.created_at, idx)
                ? DisplayDateTime(nextData?.created_at)
                : null}
            </>
          );
        })}
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="absolute ml-11 flex flex-row flex-warp gap-[0.75rem] items-center w-[20rem] h-[3.25rem] bottom-[1.8rem] border-1 border-gray-DDD border-solid rounded-full "
      >
        <input
          value={inputValue}
          className="flex flex-warp  ml-[12px] w-[15.25rem] text-[1.125rem] pl-[1.25rem] py-[0.5rem] h-[2.75rem] outline-none resize-none overflow-y-hidden leading-[1.5rem]"
          placeholder="write a message "
          onChange={inputValueHandler}
        />
        <button className="absolute flex justify-center items-center right-[0.5rem] w-[2.25rem] h-[2.25rem] rounded-full bg-lightGreen hover:scale-110 transform transition-transform ease-in-out duration-300">
          <Image
            src="/assets/figmaImg/Plain.png"
            className="w-[1.25rem] h-[1.25rem] "
            width={100}
            height={100}
            alt="보내기"
          />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
