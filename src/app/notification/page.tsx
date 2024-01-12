'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getCustomFlirtingInNotificationList, subscribeFlirtingList } from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';

const Notification: React.FC = () => {
  const { openModal } = useAlertModal();
  const [flirtingList, setFlirtingList] = useState<FlirtingListInNotificationType[] | null>(null);
  //랜딩시 통신
  const fetchRequestSenderData = async () => {
    try {
      const userData = await getCustomFlirtingInNotificationList();
      console.log(`보낸이 데이터 :`, userData);
      setFlirtingList(userData);
    } catch (error) {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    // callback
    subscribeFlirtingList((payload) => {
      console.log('payload입니다:', payload);
      fetchRequestSenderData();
    });
    fetchRequestSenderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // interface NotificationItem {
  //   id: string;
  //   name: string;
  //   sender_uid: string;
  //   receiver_uid: string;
  //   created_at: string;
  //   room_id: string;
  //   flirting_list_id: string;
  //   matched: boolean;
  //   notice1: string;
  //   notice2: string;
  //   notice3: string;
  //   notice_category: string;
  // }

  // const { notification } = notificationData;
  // const notificationCategory = [
  //   { id: '1', text: '⚡ Request' },
  //   { id: '2', text: '💜 Message' },
  //   { id: '3', text: '🟡 Yellow Light' }
  // ];
  // const noticeText = [
  //   { id: '1', text: '님이 crosswalk 연결 요청을 보냈습니다.' },
  //   { id: '2', text: '님이 메세지를 보냈습니다.' },
  //   { id: '3', text: '님과 신호등이 연결되었습니다!' }
  // ];

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, '0'); // 시간을 2자리로 표시
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분을 2자리로 표시
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <div className="relative border-1 border-black max-w-96 px-8">
        <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center  border-b-1 border-E9EAEB">
          <Link href="/" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil">CrossWalk</div>
        </header>
        {flirtingList ? (
          <ul className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
            {flirtingList.map((item) => {
              return (
                <Link
                  key={item.id}
                  href="/message"
                  className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
                >
                  <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                    <div className="flex justify-between">
                      <div className="text-base font-normal font-medium leading-none pb-1">
                        {/* {
                          notificationCategory.find((noticeCategory) => noticeCategory.id === item.notice_category)
                            ?.text
                        } */}
                        {item.is_matched ? <p>💚 Connected</p> : <p>⚡ Request</p>}
                      </div>
                      <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                        {formatTime(item.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-row overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                      <div>{item.custom_users.name}</div>
                      {item.is_matched ? (
                        <p>님과 신호등이 연결되었습니다!</p>
                      ) : (
                        <p>님이 crosswalk 연결 요청을 보냈습니다.</p>
                      )}
                      {/* {noticeText.find((notice) => notice.id === item.notice_category)?.text} */}
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]">
            <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer"></li>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
