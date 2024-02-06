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
import useNotificationActions from '@/hooks/useNotificationActions';
import useFetchNotificationData from '@/hooks/useFetchNotificationData';
import useFetchUserNamesInNotiBell from '@/hooks/useFetchUserNamesNotiBell';

function NotiBell() {
  const { openModal } = useAlertModal();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [notificationData, setNotificationData] = useState<FlirtingListInNotificationType[]>([]);
  const [userNames, setUserNames] = useState<{ sender: string | null; receiver: string | null }[]>([]);

  const [filteredNotificationsSender, setFilteredNotificationsSender] = useState<FlirtingListInNotificationType[]>([]);
  const [filteredNotificationsReceiver, setFilteredNotificationsReceiver] = useState<FlirtingListInNotificationType[]>(
    []
  );
  const { popSenderData, popReceiverData, addReceiverData, addSenderData } = useNotificationActions(
    notificationData,
    filteredNotificationsSender,
    filteredNotificationsReceiver,
    setFilteredNotificationsSender,
    setFilteredNotificationsReceiver
  );

  const fetchNotificationData = useFetchNotificationData(setNotificationData, openModal);

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

  useFetchUserNamesInNotiBell(
    notificationData,
    currentUser,
    getUser1NameNotification,
    getUser2NameNotification,
    setFilteredNotificationsSender,
    setFilteredNotificationsReceiver,
    setUserNames,
    openModal
  );

  // console.log('filteredNotificationsSender', filteredNotificationsSender);
  // console.log('filteredNotificationsReceiver', filteredNotificationsReceiver);
  return (
    <Fragment>
      {Number(notificationData?.length) > 0 ? (
        <div className="absolute right-0 cursor-pointer relative">
          <Link href="/notification">
            <HiOutlineBell size={25} className="ml-auto" />
            {(filteredNotificationsSender.length > 0 &&
              filteredNotificationsSender.some((item) => item.sender_is_read_in_noti === false)) ||
            (filteredNotificationsReceiver.length > 0 &&
              filteredNotificationsReceiver.some((item) => item.receiver_is_read_in_noti === false)) ? (
              // 알림있음
              <Image
                src="/assets/figmaImg/redDot.png"
                alt="new notification"
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
