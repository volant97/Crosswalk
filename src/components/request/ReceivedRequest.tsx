/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import RequestCard from './RequestCard';
import useAlertModal from '../common/modal/AlertModal';
import {
  changeStatusToRead,
  getCustomFlirtingListAtRequest,
  subscribeRequestedFlirtingList,
  untrackRequestedFlirtingList
} from '@/lib/api/requestApi';
import type { FlirtingListRequestType } from '@/types/flirtingListType';

const ReceivedRequest = () => {
  const { openModal } = useAlertModal();

  const [flirtingList, setFlirtingList] = useState<FlirtingListRequestType[] | null>(null);
  const user = useRecoilValue(userState);
  const uid = user?.id;

  /**플러팅리스트 데이터와 커스텀유저의 데이터를 커스텀하여 가져옴 */
  const getRequestedFlirtingData = async () => {
    try {
      const userData = await getCustomFlirtingListAtRequest();
      setFlirtingList(userData);
    } catch {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  /**랜딩
   * 1. (receiverUid) status를 READ로 변경
   * 2. (receiverUid) 받은 사람이 메시지를 읽었다고 판단하여 read_in_noti: true로 변경 */
  const ChangeIsReadInNoti = async () => {
    try {
      if (uid) {
        await changeStatusToRead(uid);
      }
    } catch {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  /**랜딩 : 동작하는 함수 묶어서 비동기 처리 */
  const landingRequest = async () => {
    await ChangeIsReadInNoti();
    await getRequestedFlirtingData();
  };

  /**화면에 나타나는 리스트는 접속자 uid인 것과 status가 READ인 리스트만 나오도록 필터링 */
  const filteredFlirtingList = flirtingList?.filter((f) => {
    return f.status === 'READ' && f.receiver_uid === uid;
  });

  useEffect(() => {
    // 실시간 realtime
    // callback
    subscribeRequestedFlirtingList((payload: any) => {
      landingRequest();
    });

    // 랜딩
    landingRequest();

    // 언마운트 시(clean-up 시) 실행
    return () => {
      untrackRequestedFlirtingList();
    };
  }, [uid]);

  return (
    <div className="flex flex-col items-center gap-[4px] w-full py-[28px]">
      {Number(flirtingList?.length) > 0 ? (
        Number(filteredFlirtingList?.length) > 0 ? (
          filteredFlirtingList?.map((item) => {
            return (
              <RequestCard
                key={item.id}
                listId={item.id}
                senderId={item.sender_uid}
                avatar={item.custom_users.avatar}
                senderName={item.custom_users.name}
                age={item.custom_users.age}
                message={item.flirting_message}
              />
            );
          })
        ) : (
          // 받은 메시지는 있지만, 전부 확인하여 화면에 없을 때
          <p>받은 요청이 없습니다.</p>
        )
      ) : (
        // 받은 메시지가 아예 없을 때
        <p>받은 요청이 없습니다.</p>
      )}
    </div>
  );
};

export default ReceivedRequest;
