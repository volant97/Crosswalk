import { FlirtingListInNotificationType } from '@/types/flirtingListType';
import { useState } from 'react';

export const useNotificationActions = (
  notificationData: FlirtingListInNotificationType[],
  filteredNotificationsSender: FlirtingListInNotificationType[],
  filteredNotificationsReceiver: FlirtingListInNotificationType[],
  setFilteredNotificationsSender: React.Dispatch<React.SetStateAction<FlirtingListInNotificationType[]>>,
  setFilteredNotificationsReceiver: React.Dispatch<React.SetStateAction<FlirtingListInNotificationType[]>>
) => {
  const popSenderData = () => {
    if (filteredNotificationsSender.length > 0 && filteredNotificationsSender[0].sender_is_read_in_noti === true) {
      setFilteredNotificationsSender((prev) => prev.slice(1));
    }
  };

  const popReceiverData = () => {
    if (
      filteredNotificationsReceiver.length > 0 &&
      filteredNotificationsReceiver[0].receiver_is_read_in_noti === true
    ) {
      setFilteredNotificationsReceiver((prev) => prev.slice(1));
    }
  };

  const addReceiverData = () => {
    if (notificationData.length > 0 && !notificationData[0].receiver_is_read_in_noti) {
      setFilteredNotificationsReceiver((prev) => [...prev, notificationData[0]]);
    }
  };

  const addSenderData = () => {
    if (notificationData.length > 0 && !notificationData[0].sender_is_read_in_noti) {
      setFilteredNotificationsSender((prev) => [...prev, notificationData[0]]);
    }
  };

  return { popSenderData, popReceiverData, addReceiverData, addSenderData };
};

export default useNotificationActions;
