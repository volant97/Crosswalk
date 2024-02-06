/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { UserState } from '@/recoil/user';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';

export const useFetchUserNamesInNotiBell = (
  notificationData: FlirtingListInNotificationType[],
  currentUser: UserState,
  getUser1NameNotification: (notification: FlirtingListInNotificationType) => Promise<any>,
  getUser2NameNotification: (notification: FlirtingListInNotificationType) => Promise<any>,
  setFilteredNotificationsSender: React.Dispatch<React.SetStateAction<FlirtingListInNotificationType[]>>,
  setFilteredNotificationsReceiver: React.Dispatch<React.SetStateAction<FlirtingListInNotificationType[]>>,
  setUserNames: React.Dispatch<React.SetStateAction<{ sender: string | null; receiver: string | null }[]>>
) => {
  useEffect(() => {
    const fetchUserNames = async () => {
      const isSender = notificationData.map((notification) => notification.sender_uid === currentUser?.id);
      const isReceiver = notificationData.map((notification) => notification.receiver_uid === currentUser?.id);

      try {
        const names = await Promise.all(
          notificationData.map(async (notification, index) => {
            const senderData = await getUser1NameNotification(notification);
            const receiverData = await getUser2NameNotification(notification);
            return {
              sender: senderData[0]?.name || 'Unknown',
              receiver: receiverData[0]?.name || 'Unknown',
              isSender: isSender[index],
              isReceiver: isReceiver[index]
            };
          })
        );

        const filteredSenderNotifications = notificationData.filter(
          (notification, index) => names[index].isSender && !notification.sender_is_read_in_noti
        );
        setFilteredNotificationsSender(filteredSenderNotifications);

        const filteredReceiverNotifications = notificationData.filter(
          (notification, index) => names[index].isReceiver && !notification.receiver_is_read_in_noti
        );
        setFilteredNotificationsReceiver(filteredReceiverNotifications);

        setUserNames(names);
      } catch (error) {
        console.error('서버와의 통신 중 에러가 발생했습니다.');
      }
    };

    if (notificationData.length > 0) {
      fetchUserNames();
    }
  }, [notificationData, currentUser, getUser1NameNotification, getUser2NameNotification]);
};

export default useFetchUserNamesInNotiBell;
