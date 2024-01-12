'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import receiveRequestData from '@/data/receiveRequestData.json';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { FlirtingListType } from '@/types/flirtingListType';
import { getFlirtingRequestData } from '@/lib/api/SupabaseApi';
import NavBar from '../common/ui/NavBar';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { ScrollShadow } from '@nextui-org/react';

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
      <div className="relative max-w-96 border-solid border-1 border-black px-8">
        <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-2 ">
          <Link href="/" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil ">CrossWalk</div>
        </header>
        <NavBar />

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
      </div>
    </>
  );
};

export default ReceivedRequest;

// import { ScrollShadow } from '@nextui-org/react';
{
  //   <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]"></ScrollShadow>
  // <h1 className="flex  text-xl border-2 border-black">받은 요청 {flirtingData.length}건</h1>
}
