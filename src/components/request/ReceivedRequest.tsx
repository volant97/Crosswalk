import { ScrollShadow } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RequestCard from './RequestCard';
import receiveRequestData from '@/data/receiveRequestData.json';
import NavBar from '../common/ui/NavBar';

function ReceivedRequest() {
  const { flirtingData } = receiveRequestData;
  return (
    <>
      <div className="relative max-w-96 border-solid border-1 border-black px-8">
        <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-2 ">
          <Link href="/" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil ">CrossWalk</div>
        </header>
        <NavBar />
        <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]">
          <h1 className="text-xl ml-[20px] mb-[20px]">받은 요청 {flirtingData.length}건</h1>
          <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
            {flirtingData.map((item) => {
              return (
                <RequestCard
                  key={item.id}
                  message={item.flirtingMessage}
                  senderName={item.sender_uid}
                  avatar={item.avatar}
                  createdAt={item.created_at}
                />
              );
            })}
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}

export default ReceivedRequest;
