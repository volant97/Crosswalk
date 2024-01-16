'use client';
import { Fragment, useEffect, useState } from 'react';
import {
  getNotificationDetail,
  getUser1NameNotification,
  getUser2NameNotification,
  subscribeFlirtingList,
  updateIsReadInNotiReceiverSide,
  updateIsReadInNotiSenderSide
} from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';

const Test = () => {
  const { openModal } = useAlertModal();
  const [currentUser, setCurrentUser] = useRecoilState(isUserState);
  const [notificationData, setNotificationData] = useState<FlirtingListInNotificationType[]>([]);
  const [userNames, setUserNames] = useState<{ sender: string | null; receiver: string | null }[]>([]);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000;
    if (diff < 60 * 1) {
      return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 3) {
      const distanceString = formatDistanceToNow(d, { addSuffix: true, locale: ko, includeSeconds: true });
      return distanceString.replace(/^약\s*/, '');
    }
    return format(d, 'PPP EEE p', { locale: ko });
  };

  const fetchNotificationData = async () => {
    try {
      const data = await getNotificationDetail();
      console.log('fetchNotificationData', data);
      setNotificationData(data);
    } catch (error) {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    subscribeFlirtingList((payload) => {
      console.log('payload입니다:', payload);
      fetchNotificationData();
    });

    fetchNotificationData();
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const names = await Promise.all(
          notificationData.map(async (notification) => {
            const senderData = await getUser1NameNotification(notification);
            const receiverData = await getUser2NameNotification(notification);
            console.log('senderData', senderData);
            console.log('receiverData', receiverData);
            return {
              sender: senderData[0]?.name || 'Unknown',
              receiver: receiverData[0]?.name || 'Unknown'
            };
          })
        );
        setUserNames(names);
      } catch (error) {
        openModal('서버와의 통신 중 에러가 발생했습니다.');
      }
    };

    if (notificationData.length > 0) {
      fetchUserNames();
    }
  }, [notificationData]);

  const toggleIsReadInNoticeBoardSenderSide = async (id: number | null) => {
    try {
      if (id !== null) {
        await updateIsReadInNotiSenderSide(id);
      }
    } catch (error) {
      openModal('알림을 읽는 중에 오류가 발생했습니다.');
    }
  };

  const toggleIsReadInNoticeBoardReceiverSide = async (id: number | null) => {
    try {
      if (id !== null) {
        await updateIsReadInNotiReceiverSide(id);
      }
    } catch (error) {
      openModal('알림을 읽는 중에 오류가 발생했습니다.');
    }
  };

  return (
    <Fragment>
      <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
        {Number(notificationData?.length) > 0 ? (
          notificationData?.map((notification, index) => {
            const senderIsRead = notification.sender_is_read_in_noti === true;
            const receiverIsRead = notification.receiver_is_read_in_noti === true;
            const isSender = notification.sender_uid === currentUser.uid;
            const isReceiver = notification.receiver_uid === currentUser.uid;
            if ((isSender && senderIsRead) || (isReceiver && receiverIsRead)) {
              return null; // 숨김
            }
            return (
              <ul key={notification.id}>
                <Link
                  href={'/chat-list'}
                  className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
                  onClick={() => {
                    // 토글 함수 호출
                    if (isSender) {
                      toggleIsReadInNoticeBoardSenderSide(notification.id);
                    } else if (isReceiver) {
                      toggleIsReadInNoticeBoardReceiverSide(notification.id);
                    }
                  }}
                >
                  <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                    <div className="flex justify-between">
                      <div className="text-base font-normal font-medium leading-none pb-1">
                        {notification.status === 'ACCEPT' ? (
                          <h2>알림타입: {notification.status} 💚 Connected!</h2>
                        ) : (
                          <h2>알림타입: {notification.status} ⚡ Request</h2>
                        )}
                      </div>
                      <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                        {formatDate(notification.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-row overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                      <p>
                        {notification.status === 'ACCEPT'
                          ? `${userNames[index]?.sender}님과 ${userNames[index]?.receiver}님의 신호등이 연결되었습니다!`
                          : `${userNames[index]?.sender}님이 ${userNames[index]?.receiver}님에게 연결 요청을 보냈습니다.`}
                      </p>
                    </div>
                  </li>
                </Link>
              </ul>
            );
          })
        ) : (
          <div className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]">
            <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer">받은 알림이 없습니다.</li>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Test;
