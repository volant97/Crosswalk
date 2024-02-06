'use client';
import { Fragment, useEffect, useState } from 'react';
import { getUser1NameNotification, getUser2NameNotification, subscribeFlirtingList } from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import useFetchNotificationData from '@/hooks/useFetchNotificationData';
import useToggleIsReadInNoticeBoard from '@/hooks/useToggleIsReadInNotiList';
import NotificationItem from './NotificationItem';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';

const NotificationList = () => {
  const { openModal } = useAlertModal();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [notificationData, setNotificationData] = useState<FlirtingListInNotificationType[]>([]);
  const [userNames, setUserNames] = useState<
    { sender: { name: string; uid: string } | null; receiver: { name: string; uid: string } | null }[]
  >([]);
  const fetchNotificationData = useFetchNotificationData(setNotificationData, openModal);
  const { toggleIsReadInNoticeBoardSenderSide, toggleIsReadInNoticeBoardReceiverSide } =
    useToggleIsReadInNoticeBoard(openModal);

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

  return (
    <Fragment>
      <div className="flex-col items-center justify-center w-[100%]  min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
        {Number(notificationData?.length) > 0 ? (
          notificationData.every(
            (notification) => notification.receiver_is_read_in_noti && notification.sender_is_read_in_noti
          ) ? (
            <div className="flex flex-col item-center justify-center w-full h-18 p-[20px] gap-1 ">
              <li className="flex flex-col item-center w-full h-18 p-2 gap-1 text-center">알림을 모두 읽었어요</li>
            </div>
          ) : (
            notificationData?.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                currentUser={currentUser}
                userNames={userNames[index]}
                toggleIsReadInNoticeBoardSenderSide={toggleIsReadInNoticeBoardSenderSide}
                toggleIsReadInNoticeBoardReceiverSide={toggleIsReadInNoticeBoardReceiverSide}
              />
            ))
          )
        ) : (
          <div className="flex flex-col item-center justify-center w-full h-18 p-[20px] gap-1 ">
            <li className="flex flex-col item-center  w-full h-18 p-2 gap-1 text-center">받은 알림이 없습니다.</li>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NotificationList;
