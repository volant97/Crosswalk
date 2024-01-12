'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import receiveRequestData from '@/data/receiveRequestData.json';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { FlirtingListType } from '@/types/flirtingListType';
import { getFlirtingRequestData } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';

const ReceivedRequest: React.FC = () => {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');
  const { flirtingData } = receiveRequestData;

  const [flirtingList, setFlirtingList] = useState<FlirtingListType[] | null>(null);
  // const [realTimeTrigger, setRealTimeTrigger] = useState<boolean>(false);

  // const fetchFlirtingRequestData = async () => {
  //   const data = await getFlirtingRequestData();
  //   // console.log('data', data);
  //   if (data) {
  //     setFlirtingList(data);
  //   }
  // };

  async function getRequestedFlirtingData() {
    const { data, error } = await supabase.from('flirting_list').select('flirting_message, custom_users(name)');
    console.log('가공data : ', data);
    console.error('에러:', error);
    return data;
  }

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
          // console.log(payload);
          getRequestedFlirtingData();
        }
      )
      .subscribe();
    getRequestedFlirtingData();
  }, []);

  if (!!flirtingList) {
    // console.log('flirtingList', flirtingList);
  }

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
