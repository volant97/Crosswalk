'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import receiveRequestData from '@/data/receiveRequestData.json';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { FlirtingListType } from '@/types/flirtingListType';
import { getFlirtingRequestData } from '@/lib/api/SupabaseApi';

const ReceivedRequest: React.FC = () => {
  const { flirtingData } = receiveRequestData;
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');

  const [flirtingList, setFlirtingList] = useState<FlirtingListType[] | null>(null);

  const fetFlirtingRequestData = async () => {
    const data = await getFlirtingRequestData();
    console.log('data!!!!', data);
    if (data) {
      setFlirtingList(data);
    }
  };

  useEffect(() => {
    const channelA: RealtimeChannel = client
      .channel('room1')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'flirting_list'
        },
        (payload) => {
          console.log({ payload });
          fetFlirtingRequestData();
        }
      )
      .subscribe();
  }, []);

  if (!flirtingList) return;
  console.log('0000000000', flirtingList[0].flirting_message);

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
};

export default ReceivedRequest;

// import { ScrollShadow } from '@nextui-org/react';
{
  //   <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]"></ScrollShadow>
  // <h1 className="flex  text-xl border-2 border-black">받은 요청 {flirtingData.length}건</h1>
}
