'use client';

import { getMessage, postMessage, subscribeChatRoom, untrackChatRoom } from '@/lib/api/SupabaseApi';
import { UserState } from '@/recoil/user';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { Avatar } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { StatusMessage } from './ChatStatusColor';
import { ConvertedDate, DisplayDateTime, GetCurrentTime } from './ChatDate';

interface ChatProps {
  roomId: string;
  roomInfo?: ChatListType;
  getUid: UserState;
  messageData: MessageType[];
}

function ChatRoom({ roomId, roomInfo, getUid, messageData }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [congratulationsMessage, setCongratulationsMessage] = useState<boolean>(false);
  const favorableRatingGoal = 100;

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const prevMessage = messageData[messageData.length - 1];

  const getScores = () => {
    let userScore = prevMessage.user_score;
    let userContinualCount = prevMessage.user_continual_count;
    let anotherScore = prevMessage.another_score;
    let anotherContinualCount = prevMessage.another_continual_count;
    let favorable_rating = prevMessage.favorable_rating;

    /**호감도 % 계산 및 100% 달성시 축하메시지 상태 true로 변경 */
    const increaseFavorableRating = (userScore: number, anotherScore: number) => {
      const totalScore = userScore + anotherScore;
      const rating = (totalScore / favorableRatingGoal) * 100;
      if (rating >= 100) {
        return setCongratulationsMessage(true);
      }
      favorable_rating = Math.floor(rating);
    };

    if (roomInfo?.flirting_list.sender_uid.uid === getUid?.id) {
      anotherContinualCount = 0;
      if (userContinualCount < 3) {
        userScore += 1;
        // favorable_rating = userScore + anotherScore;
        increaseFavorableRating(userScore, anotherScore);
      }
      userContinualCount += 1;
    } else {
      userContinualCount = 0;
      if (anotherContinualCount < 3) {
        anotherScore += 1;
        // favorable_rating = userScore + anotherScore;
        increaseFavorableRating(userScore, anotherScore);
      }
      anotherContinualCount += 1;
    }

    return {
      userScore,
      anotherScore,
      userContinualCount,
      anotherContinualCount,
      favorable_rating
    };
  };

  const handleSendMessage = async () => {
    if (roomInfo?.flirting_list.status === 'ACCEPT') {
      if (inputValue === '') {
        return alert('메세지를 입력해주세요');
      }

      const { anotherContinualCount, anotherScore, favorable_rating, userContinualCount, userScore } = getScores();
      const sendData = {
        subscribe_room_id: roomId,
        user_uid: getUid?.id,
        message: inputValue,
        user_score: userScore,
        another_score: anotherScore,
        user_continual_count: userContinualCount,
        another_continual_count: anotherContinualCount,
        is_read: false,
        favorable_rating: favorable_rating
      };
      console.log('sendData: ', sendData);
      await postMessage(sendData);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageData]);

  return (
    <>
      <div
        ref={chatContainerRef}
        className="relative flex flex-col items-end w-full h-[34rem] overflow-y-auto scrollbar-hide px-6"
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
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-bl-[1.8rem] max-w-48">
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
                  {roomInfo?.flirting_list.sender_uid.uid !== getUid?.id ? (
                    <Avatar
                      size="sm"
                      src={`/assets/avatar/avatar-circle/avatar${roomInfo?.flirting_list.sender_uid.avatar}-circle.png`}
                      alt="유저 아바타 이미지"
                    />
                  ) : (
                    <Avatar
                      size="sm"
                      src={`/assets/avatar/avatar-circle/avatar${roomInfo?.flirting_list.receiver_uid.avatar}-circle.png`}
                      alt="유저 아바타 이미지"
                    />
                  )}
                  <div className="text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-gray-F6 rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem] max-w-48">
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
        className="absolute ml-4 flex flex-row flex-warp gap-[0.75rem] items-center w-[20rem] h-[3.25rem] bottom-[1.8rem] border-1 border-gray-DDD border-solid rounded-full "
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
