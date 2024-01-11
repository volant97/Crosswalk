// import { ScrollShadow } from '@nextui-org/react';
import React from 'react';
import RequestCard from './RequestCard';
import receiveRequestData from '@/data/receiveRequestData.json';

function ReceivedRequest() {
  const { flirtingData } = receiveRequestData;

  return (
    <>
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
    </>
  );
}

export default ReceivedRequest;

{
  //   <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]"></ScrollShadow>
  // <h1 className="flex  text-xl border-2 border-black">받은 요청 {flirtingData.length}건</h1>
}
