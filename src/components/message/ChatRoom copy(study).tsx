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
}

function ChatRoom({ roomId, roomInfo, getUid }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // const [prevMessage, setPrevMessage] = useState<MessageType>();

  const [congratulationsMessage, setCongratulationsMessage] = useState<boolean>(false);

  const favorableRatingGoal = 100;

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const prevMessage = messageData[messageData.length - 1];

  const getScores = () => {
    // if (prevMessage?.user_uid === getUid?.id) {
    //   console.log('상대 초기화');
    //   setUserContinualCount(0);
    //   if (myContinualCount < 3) {
    //     setMyScore(myScore + 1);
    //     increaseFavorableRating(myScore, userScore);
    //   }
    //   setMyContinualCount(myContinualCount + 1);
    // } else {
    //   console.log('상대 초기화');
    //   console.log('어째서 실행이 안되지?');
    //   setMyContinualCount(0);
    //   if (userContinualCount < 3) {
    //     setUserScore(userScore + 1);
    //     increaseFavorableRating(myScore, userScore);
    //   }
    //   setUserContinualCount(userContinualCount + 1);
    // }

    const userScore = prevMessage.user_score + 1;
    const anotherScore = prevMessage.another_score + 1;
    const userContinualCount = prevMessage.user_continual_count + 1;
    const anotherContinualCount = prevMessage.another_continual_count + 1;
    const favorable_rating = prevMessage.favorable_rating + 1;

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

      await postMessage(sendData);
      setInputValue('');
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

  /**호감도 % 계산 및 100% 달성시 축하메시지 상태 true로 변경 */
  // const increaseFavorableRating = (myScore: number, userScore: number) => {
  //   console.log('호감도 계산 진행 중');
  //   console.log('myScore', myScore);
  //   console.log('userScore', userScore);
  //   const totalScore = myScore + userScore + 1;
  //   const rating = (totalScore / favorableRatingGoal) * 100;
  //   if (rating >= 100) {
  //     return setCongratulationsMessage(true);
  //   }
  //   setFavorableRating(Math.floor(rating));
  // };

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
    // setPrevMessage(messageData[messageData.length - 1]);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageData]);

  // useEffect(() => {
  //   if (prevMessage) {
  //     setFavorableRating(prevMessage.favorable_rating);
  //     setMyScore(prevMessage.user_score);
  //     setUserScore(prevMessage.another_score);
  //     setMyContinualCount(prevMessage.user_continual_count);
  //     setUserContinualCount(prevMessage.another_continual_count);
  //   }
  // }, []);

  // console.log(prevMessage);
  // console.log(favorableRating);

  console.log('!!!', prevMessage);

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
