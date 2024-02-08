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
import bellImg from '@assets/figmaImg/bell.png';
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
            <Image className="w-[24px] h-[24px] ml-auto" src={bellImg} width={100} height={100} alt="알림 이미지" />
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
                className="absolute top-[-2px] right-[-1px]"
              />
            ) : // 알림없음
            null}
          </Link>
        </div>
      ) : (
        <div className="absolute right-0 cursor-pointer relative">
          <Link href="/notification">
            <Image className="w-[24px] h-[24px] ml-auto" src={bellImg} width={100} height={100} alt="알림 이미지" />
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default NotiBell;
