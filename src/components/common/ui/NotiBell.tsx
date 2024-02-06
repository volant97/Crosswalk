/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { getUser1NameNotification, getUser2NameNotification, subscribeFlirtingList } from '@/lib/api/SupabaseApi';
import useNotificationActions from '@/hooks/useNotificationActions';
import useFetchNotificationData from '@/hooks/useFetchNotificationData';
import useFetchUserNamesInNotiBell from '@/hooks/useFetchUserNamesNotiBell';
import useAlertModal from '../modal/AlertModal';
import { HiOutlineBell } from 'react-icons/hi2';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';

function NotiBell() {
  const { openModal } = useAlertModal();

  const currentUser = useRecoilValue(userState);
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
      fetchNotificationData();
      popSenderData();
      popReceiverData();
      addReceiverData();
      addSenderData();
    });

    fetchNotificationData();
  }, []);

  useFetchUserNamesInNotiBell(
    notificationData,
    currentUser,
    getUser1NameNotification,
    getUser2NameNotification,
    setFilteredNotificationsSender,
    setFilteredNotificationsReceiver,
    setUserNames
  );

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
            ) : // 알림없음
            null}
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
