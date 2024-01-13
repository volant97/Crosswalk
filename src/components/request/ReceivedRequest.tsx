'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import { createClient } from '@supabase/supabase-js';
import { FlirtingListRequestType } from '@/types/flirtingListType';
import { getCustomFlirtingListAtRequest, subscribeFlirtingList } from '@/lib/api/SupabaseApi';
import useAlertModal from '../common/modal/AlertModal';

const ReceivedRequest: React.FC = () => {
  const { openModal } = useAlertModal();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');
  const [flirtingList, setFlirtingList] = useState<FlirtingListRequestType[] | null>(null);

  const getRequestedFlirtingData = async () => {
    try {
      const userData = await getCustomFlirtingListAtRequest();
      setFlirtingList(userData);
    } catch {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    // callback
    subscribeFlirtingList((payload) => {
      console.log('요청함 payload : ', payload);
      getRequestedFlirtingData();
    });
    getRequestedFlirtingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!!flirtingList ? (
        flirtingList.map((item) => {
          return (
            <RequestCard
              key={item.id}
              cardId={item.id}
              avatar={item.custom_users?.avatar}
              senderName={item.custom_users?.name}
              age={item.custom_users?.age}
              message={item.flirting_message}
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
//   <ScrollShadow size={100} hideScrollBar className="w-[300px] h-[800px]"></ScrollShadow>
//   <h1 className="flex  text-xl border-2 border-black">받은 요청 {flirtingData.length}건</h1>

// const channelA: RealtimeChannel = client
//   .channel('room1')
//   .on(
//     'postgres_changes',
//     {
//       event: '*',
//       schema: 'public',
//       table: 'flirting_list'
//     },
//     (payload) => {
//       // console.log(payload);
//       getRequestedFlirtingData();
//     }
//   )
//   .subscribe();
