'use client';
import {
  getNotificationDetail,
  getUser1NameNotification,
  getUser2NameNotification,
  subscribeFlirtingList
} from '@/lib/api/SupabaseApi';
import { isUserState } from '@/recoil/auth';
import { FlirtingListInNotificationType } from '@/types/flirtingListType';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import useAlertModal from '../modal/AlertModal';
import Image from 'next/image';
import { userState } from '@/recoil/user';

function NotiBell() {
  const { openModal } = useAlertModal();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [notificationData, setNotificationData] = useState<FlirtingListInNotificationType[]>([]);
  const [userNames, setUserNames] = useState<{ sender: string | null; receiver: string | null }[]>([]);
  const [filteredNotificationsSender, setFilteredNotificationsSender] = useState<FlirtingListInNotificationType[]>([]);
  const [filteredNotificationsReceiver, setFilteredNotificationsReceiver] = useState<FlirtingListInNotificationType[]>(
    []
  );

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
      popSenderData();
      popReceiverData();
      addReceiverData();
      addSenderData();
    });

    fetchNotificationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      const isSender = notificationData.map((notification) => notification.sender_uid === currentUser?.id);
      const isReceiver = notificationData.map((notification) => notification.receiver_uid === currentUser?.id);

      try {
        const names = await Promise.all(
          notificationData.map(async (notification, index) => {
            const senderData: any = await getUser1NameNotification(notification);
            const receiverData: any = await getUser2NameNotification(notification);
            // console.log('senderData', senderData);
            // console.log('receiverData', receiverData);
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
        // console.log('필터링된 s', filteredSenderNotifications);
        const filteredReceiverNotifications = notificationData.filter(
          (notification, index) => names[index].isReceiver && !notification.receiver_is_read_in_noti
        );
        setFilteredNotificationsReceiver(filteredReceiverNotifications);
        // console.log('필터링된 r', filteredReceiverNotifications);
        setUserNames(names);
      } catch (error) {
        // openModal('서버와의 통신 중 에러가 발생했습니다.');
      }
    };

    if (notificationData.length > 0) {
      fetchUserNames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData]);

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

  return (
    <Fragment>
      {Number(notificationData?.length) > 0 ? (
        <div className="absolute right-0 cursor-pointer relative">
          <Link href="/notification">
            <HiOutlineBell size={25} className="ml-auto" />
            {filteredNotificationsSender.length > 0 || filteredNotificationsReceiver.length > 0 ? (
              // 알림있음
              <Image
                src="/assets/figmaImg/redDot.png"
                alt="red dot"
                width={8}
                height={8}
                className="absolute top-0 right-0"
              />
            ) : (
              // 알림없음
              <p></p>
            )}
          </Link>
        </div>
      ) : (
        <div className="absolute right-0 cursor-pointer relative">
          <Link href="/notification">
            <HiOutlineBell size={25} className="ml-auto" />
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default NotiBell;
