'use client';

import Image from 'next/image';
import React, { Fragment, useEffect, useRef, useState } from 'react';

function ChatRoom() {
  const [inputValue, setInputValue] = useState('');
  const [senderMessage, setSenderMessage] = useState<any>([]);
  const [receiverMessage, setReceiverMessage] = useState<any>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const inputValueHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSenderMessage = (message: string) => {
    setSenderMessage((prevMessages: any) => {
      const messages = Array.isArray(prevMessages) ? prevMessages : [];
      return [...messages, message];
    });
  };

  const handleReceiverMessage = (message: string) => {
    setReceiverMessage((prevMessages: any) => {
      const messages = Array.isArray(prevMessages) ? prevMessages : [];
      return [...messages, message];
    });
  };
  useEffect(() => {
    // 새로운 채팅이 들어올 떄 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [senderMessage, receiverMessage]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours} : ${minutes}`;
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className="relative flex flex-col items-end w-full h-[33.5rem] overflow-y-auto scrollbar-hide"
      >
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
        {/* <div className="flex justify-center items-center border-1 border-solid border-gray-DDD w-full py-[0.5rem] rounded-[3.125rem] text-[0.875rem]">
        <Image
          src="/assets/figmaImg/yellowLight.png"
          className="w-[1rem] h-[1rem] mr-[0.25rem]"
          width={50}
          height={50}
          alt="노란불"
        />
        신호등이 켜졌습니다. 서로에게 다가가세요!
      </div> */}
        <div className="flex mr-auto ml-auto justify-center my-[1rem]">
          <div className="flex justify-center items-center border-1 border-solid border-gray-DDD  py-[0.5rem] rounded-[3.125rem] text-[0.875rem] px-[1rem] text-gray-999">
            <Image
              src="/assets/figmaImg/Calendar.png"
              className="w-[1rem] h-[1rem] mr-[0.25rem]"
              width={50}
              height={50}
              alt="캘린더"
            />
            2023년 12월 31일
          </div>
        </div>

        {senderMessage?.map((message: string, index: number) => {
          return (
            <div className="w-[15rem] flex justify-end " key={index}>
              <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                <div className="relative text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-bl-[1.8rem] max-w-[15rem]">
                  <h1 className="font-medium break-all">{message}</h1>
                  <h1 className="absolute text-[0.75rem] text-gray-999 bottom-[1px] left-[-40px] whitespace-nowrap">
                    {getCurrentTime()}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
        {receiverMessage.map((message: string, index: number) => {
          return (
            <div className="mr-auto " key={index}>
              <div className="flex flex-row gap-[0.38rem] mt-[1rem]">
                <Image
                  src="/assets/avatar/avatar0.png"
                  className="rounded-full w-[1.875rem] h-[1.875rem]"
                  width={100}
                  height={100}
                  alt="아바타 이미지"
                />
                <div className="relative text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-gray-F6 rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem] max-w-[15rem]">
                  <h1 className="font-medium break-all">{message}</h1>
                  <h1 className="absolute text-[0.75rem] text-gray-999 mt-[20px] whitespace-nowrap bottom-[1px] right-[-40px]">
                    {getCurrentTime()}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className="absolute left-[5px] flex flex-row gap-[0.38rem] mt-[4.5rem]">
          <Image
            src="/assets/avatar/avatar0.png"
            className="rounded-full w-[1.875rem] h-[1.875rem]"
            width={100}
            height={100}
            alt="아바타 이미지"
          />
          <div className=" text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem]">
            <h1 className="font-medium">네, 방 나가고 싶어요.</h1>
          </div>
          <h1 className="text-[0.75rem] text-gray-999 mt-[20px]">18 : 23</h1>
        </div>
        <div className="absolute right-[5px] flex flex-row gap-[0.38rem] mt-[8rem]">
          <h1 className="text-[0.75rem] text-gray-999 mt-[20px]">18 : 23</h1>
          <div className=" text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-bl-[1.8rem]">
            <h1 className="font-medium">네, 방 나가고 싶어요.</h1>
          </div>
        </div>
        <div className="absolute left-[5px] flex flex-row gap-[0.38rem] mt-[11.5rem]">
          <Image
            src="/assets/avatar/avatar0.png"
            className="rounded-full w-[1.875rem] h-[1.875rem]"
            width={100}
            height={100}
            alt="아바타 이미지"
          />
          <div className=" text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem]">
            <h1 className="font-medium">네, 방 나가고 싶어요.</h1>
          </div>
          <h1 className="text-[0.75rem] text-gray-999 mt-[20px]">18 : 23</h1>
        </div>
        <div className="absolute left-[5px] flex flex-row gap-[0.38rem] mt-[15rem]">
          <Image
            src="/assets/avatar/avatar0.png"
            className="rounded-full w-[1.875rem] h-[1.875rem]"
            width={100}
            height={100}
            alt="아바타 이미지"
          />
          <div className=" text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem] w-[170px] ">
            <h1 className="font-medium">안녕하세요~ 반갑습니다. 여행 좋아하시나봐요? 저도 여행좋아해요.</h1>
          </div>
        </div>
        <div className="absolute left-[40px] flex flex-row gap-[0.38rem] mt-[21.5rem]">
          <div className=" text-[0.875rem] px-[1.25rem] py-[0.5rem] bg-lightGreen rounded-tl-[1.8rem] rounded-tr-[1.8rem] rounded-br-[1.8rem]">
            <h1 className="font-medium">네, 방 나가고 싶어요.</h1>
          </div>
          <h1 className="text-[0.75rem] text-gray-999 mt-[20px]">18 : 23</h1>
        </div> */}
      </div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // handleSenderMessage(inputValue);
          handleReceiverMessage(inputValue);
          setInputValue('');
        }}
        className="absolute flex flex-row flex-warp gap-[0.75rem] items-center w-[20rem] h-[3.25rem] bottom-[1.8rem] border-1 border-gray-DDD border-solid rounded-full "
      >
        <textarea
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
