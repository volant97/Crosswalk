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
import type {
  FlirtingListInNotificationType,
  FlirtingListType,
  customUserNameNotiType
} from '@/types/flirtingListType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

const NotificationList = () => {
  const { openModal } = useAlertModal();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [notificationData, setNotificationData] = useState<FlirtingListInNotificationType[]>([]);
  const [userNames, setUserNames] = useState<
    { sender: { name: string; uid: string } | null; receiver: { name: string; uid: string } | null }[]
  >([]);
  // console.log('!!!', userNames);
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
      // console.log('fetchNotificationData', data);
      setNotificationData(data);
    } catch (error) {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    subscribeFlirtingList((payload) => {
      // console.log('payload입니다:', payload);
      fetchNotificationData();
    });

    fetchNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const names = await Promise.all(
          notificationData.map(async (notification) => {
            const senderData: any = await getUser1NameNotification(notification);
            const receiverData: any = await getUser2NameNotification(notification);
            // console.log('senderData', senderData);
            // console.log('receiverData', receiverData);
            return {
              sender: {
                name: senderData[0]?.name || 'unknown',
                uid: senderData[0]?.uid || 'unknown'
              },
              receiver: {
                name: receiverData[0]?.name || 'unknown',
                uid: receiverData[0]?.uid || 'unknown'
              }
            };
          })
        );
        setUserNames(names);
      } catch (error) {
        // openModal('서버와의 통신 중 에러가 발생했습니다.');
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
  console.log('notificcationDATAAA:', notificationData);
  return (
    <Fragment>
      <div className="flex-col items-center justify-center w-[100%]  min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
        {Number(notificationData?.length) > 0 ? (
          notificationData.every(
            (notification) => notification.receiver_is_read_in_noti && notification.sender_is_read_in_noti
          ) ? (
            <div className="flex flex-col item-center justify-center max-w-96 h-18 p-2 gap-1 ">
              <li className="flex flex-col item-center  max-w-96 h-18 p-2 gap-1 text-center">받은 알림이 없습니다.</li>
            </div>
          ) : (
            notificationData?.map((notification, index) => {
              const senderIsRead = notification.sender_is_read_in_noti === true;
              const receiverIsRead = notification.receiver_is_read_in_noti === true;
              const isSender = notification.sender_uid === currentUser?.id;
              const isReceiver = notification.receiver_uid === currentUser?.id;
              if ((isSender && senderIsRead) || (isReceiver && receiverIsRead)) {
                return null; // 숨김
              }
              if (userNames[index]?.sender === undefined && userNames[index]?.receiver === undefined) {
                return (
                  <div key={notification.id} className="flex flex-col item-center max-w-96 h-18 p-2 gap-1">
                    <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 ">신호 대기중...</li>
                  </div>
                );
              }
              return (
                <ul key={notification.id} className="flex-col justify-center items-center text-center">
                  <Link
                    href={
                      notification.status === 'ACCEPT'
                        ? '/chat-list'
                        : notification.status === 'UNREAD' ||
                          (notification.status === 'READ' && currentUser?.id === userNames[index]?.sender?.uid)
                        ? '/notification'
                        : notification.status === 'UNREAD' ||
                          (notification.status === 'READ' && currentUser?.id === userNames[index]?.receiver?.uid)
                        ? '/request'
                        : '/main'
                    }
                    className="flex flex-col item-center justify-center max-w-[100%] gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
                    onClick={() => {
                      if (isSender) {
                        toggleIsReadInNoticeBoardSenderSide(notification.id);
                      } else if (isReceiver) {
                        toggleIsReadInNoticeBoardReceiverSide(notification.id);
                      }
                    }}
                  >
                    <li className="flex flex-col justify-center w-full h-[70px] pl-[22px] pr-[22px] pt-[13px] pb-[13px] cursor-pointer gap-[5px]">
                      <div className="flex justify-between">
                        <div className="flex flex-col justify-center items-center text-center font-medium leading-[16px] h-[20px] text-[16px] ">
                          {notification.status === 'ACCEPT' ? (
                            <h2 className="flex flex-col justify-center ">💚 Connected!</h2>
                          ) : (
                            <h2>⚡ Request</h2>
                          )}
                        </div>
                        <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA] text-[12px] ">
                          {formatDate(notification.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-row overflow-hidden  truncate ">
                        <p className="text-gray-666 text-[14px] text-Pretendard font-normal leading-[19px]">
                          {notification.status === 'ACCEPT'
                            ? `${userNames[index]?.sender?.name}님과 ${userNames[index]?.receiver?.name}님의 신호등이 연결되었습니다!`
                            : `${userNames[index]?.sender?.name}님이 ${userNames[index]?.receiver?.name}님에게 연결 요청을 보냈습니다.`}
                        </p>
                      </div>
                    </li>
                  </Link>
                </ul>
              );
            })
          )
        ) : (
          <div className="flex flex-col item-center justify-center max-w-96 h-18 p-2 gap-1 ">
            <li className="flex flex-col item-center  max-w-96 h-18 p-2 gap-1 text-center">받은 알림이 없습니다.</li>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NotificationList;
