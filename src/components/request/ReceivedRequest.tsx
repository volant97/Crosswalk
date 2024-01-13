'use client';

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import { FlirtingListRequestType } from '@/types/flirtingListType';
import { getCustomFlirtingListAtRequest, subscribeFlirtingList } from '@/lib/api/SupabaseApi';
import useAlertModal from '../common/modal/AlertModal';
import { supabase } from '@/lib/supabase-config';

const ReceivedRequest: React.FC = () => {
  const { openModal } = useAlertModal();
  const [flirtingList, setFlirtingList] = useState<FlirtingListRequestType[] | null>(null);

  /**플러팅리스트 데이터와 커스텀유저의 데이터를 커스텀하여 가져옴 */
  const getRequestedFlirtingData = async () => {
    try {
      const userData = await getCustomFlirtingListAtRequest();
      setFlirtingList(userData);
    } catch {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  /**랜딩시 받은 사람이 메시지를 읽었다고 판단하여 is_read_in_noti: true로 변경 */
  const ChangeIsReadInNoti = async () => {
    if (!!flirtingList) {
      const receiverUid = flirtingList[0].receiver_uid;
      await supabase.from('flirting_list').update({ is_read_in_noti: true }).eq('receiver_uid', receiverUid).select();
    }
  };

  /**화면에 나타나는 리스트는 status가 ACCEPT, DECLINE이 아닌 리스트만 나오도록 필터링 */
  const filteredFlirtingList = flirtingList?.filter((f) => {
    return f.status !== 'ACCEPT' && f.status !== 'DECLINE';
  });

  useEffect(() => {
    // realtime 실시간
    // callback
    subscribeFlirtingList((payload) => {
      console.log('요청함 payload : ', payload);
      getRequestedFlirtingData();
    });
    // 랜딩
    getRequestedFlirtingData();
    ChangeIsReadInNoti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Number(flirtingList?.length) > 0 ? (
        Number(filteredFlirtingList?.length) > 0 ? (
          filteredFlirtingList?.map((item) => {
            return (
              <RequestCard
                key={item.id}
                listId={item.id}
                avatar={item.custom_users.avatar}
                senderName={item.custom_users.name}
                age={item.custom_users.age}
                message={item.flirting_message}
              />
            );
          })
        ) : (
          // 받은 메시지는 있지만, 전부 확인하여 화면에 없을 때
          <p>모든 메시지를 전부 확인했습니다.</p>
        )
      ) : (
        // 받은 메시지가 아예 없을 때
        <p>요청받은 메시지가 없습니다.</p>
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
