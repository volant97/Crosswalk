'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { FlirtingListRequestType } from '@/types/flirtingListType';
import { supabase } from '@/lib/supabase-config';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import NavBar from '../common/ui/NavBar';

const ReceivedRequest: React.FC = () => {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');
  const [flirtingList, setFlirtingList] = useState<FlirtingListRequestType[] | null>(null);

  async function getRequestedFlirtingData() {
    const { data, error } = await supabase
      .from('flirting_list')
      .select('*, custom_users!flirting_list_sender_uid_fkey(name, avatar, age)')
      .order('created_at', { ascending: false });
    // .returns<GetRequestedFlirtingDataType[]>;
    // console.log('플러팅받은가공data : ', data);
    if (error) {
      console.error('에러:', error);
      return;
    }
    setFlirtingList(data);
    // return data;
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

  return (
    <>
      {!!flirtingList ? (
        flirtingList?.map((item) => {
          return (
            <RequestCard
              key={item.id}
              // cardId={item.id || 0}
              avatar={item.custom_users?.avatar || 0}
              senderName={item.custom_users?.name || ''}
              age={item.custom_users?.age || 0}
              message={item.flirting_message || ''}
            />
          );
        })
      ) : (
        <p>플러팅 메시지가 없습니다.</p>
      )}
    </>
  );
};

export default ReceivedRequest;

// import { ScrollShadow } from '@nextui-org/react';
{
  //   <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]"></ScrollShadow>
  // <h1 className="flex  text-xl border-2 border-black">받은 요청 {flirtingData.length}건</h1>
}
