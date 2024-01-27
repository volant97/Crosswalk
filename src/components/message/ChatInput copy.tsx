/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useCongratModal from '../common/modal/CongratModal';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { UserState } from '@/recoil/user';

interface ChatProps {
  roomId: string;
  roomInfo?: ChatListType;
  getUid: UserState;
  messageData: MessageType[];
}

function ChatInput({ roomId, roomInfo, getUid, messageData }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [congratulationsMessage, setCongratulationsMessage] = useState<boolean>(false);
  const { openModal } = useCongratModal();

  const prevMessage = messageData[messageData?.length - 1];
  const favorableRatingGoal = 100;

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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
        favorable_rating = 100;
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
    if (roomInfo?.flirting_list.status === 'ACCEPT' || roomInfo?.flirting_list.status === 'SOULMATE') {
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
      // console.log('sendData: ', sendData);
      await postMessage(sendData);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (congratulationsMessage) {
      openModal('');
    }
  }, [congratulationsMessage]);

  // useEffect(() => {}, [messageData]);

  return (
    <div className="px-[20px] sticky h-[62px] bottom-0 bg-white">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="sticky flex flex-row flex-warp gap-[0.75rem] items-center w-full h-[3.25rem] bottom-0 border-1 border-gray-DDD border-solid rounded-full"
      >
        <input
          type="text"
          value={inputValue}
          className="flex ml-[12px] w-[15.25rem] text-[1.125rem] pl-[1.25rem] py-[0.5rem] h-[2.75rem] outline-none resize-none overflow-y-hidden leading-[1.5rem]"
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
    </div>
  );
}

export default ChatInput;
