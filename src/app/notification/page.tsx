'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getCustomFlirtingInNotificationList, subscribeFlirtingList, updateIsReadInNoti } from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

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

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
      return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 3) {
      const distanceString = formatDistanceToNow(d, { addSuffix: true, locale: ko, includeSeconds: true });
      return distanceString.replace(/^약\s*/, ''); // "약" 부분을 정규식을 사용하여 제거
    }
    return format(d, 'PPP EEE p', { locale: ko });
  };

  const toggleIsReadInNoticeBoard = async (id: number | null) => {
    try {
      if (id !== null) {
        await updateIsReadInNoti(id);
        // 데이터 업데이트 후 추가로 필요한 로직이 있다면 여기에 추가
      }
    } catch (error) {
      openModal('알림을 읽는 중에 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="relative border-1 border-black max-w-96 px-8">
        <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center  border-b-1 border-E9EAEB">
          <Link href="/main" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil">CrossWalk</div>
        </header>
        {flirtingList ? (
          <ul className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
            {flirtingList.map((item) => {
              const commonProps = {
                className:
                  'flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]'
              };

              if (item.status === 'UNREAD' && item.is_read_in_noti === false) {
                return (
                  <Link
                    href="/request"
                    key={item.id}
                    {...commonProps}
                    onClick={() => toggleIsReadInNoticeBoard(item.id)}
                  >
                    <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                      <div className="flex justify-between">
                        <div className="text-base font-normal font-medium leading-none pb-1">
                          <p>⚡ Request</p>
                        </div>
                        <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-row overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                        <div>{item.custom_users.name}</div>
                        <p>님이 crosswalk 연결 요청을 보냈습니다.</p>
                      </div>
                    </li>
                  </Link>
                );
              } else if (item.status === 'ACCEPT' && item.is_read_in_noti === false) {
                return (
                  <Link
                    href="/chat-list"
                    key={item.id}
                    {...commonProps}
                    onClick={() => toggleIsReadInNoticeBoard(item.id)}
                  >
                    <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                      <div className="flex justify-between">
                        <div className="text-base font-normal font-medium leading-none pb-1">
                          <p>💚 Connected</p>
                        </div>
                        <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-row overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                        <div>{item.custom_users.name}</div>
                        <p>님과 신호등이 연결되었습니다!</p>
                      </div>
                    </li>
                  </Link>
                );
              } else if (item.status === 'DECLINE' && item.is_read_in_noti === true) {
                return null; // 이미 읽은 DECLINE 상태는 렌더링하지 않음
              } else {
                return null;
              }
            })}
          </ul>
        ) : (
          <div className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]">
            <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer">받은 알림이 없습니다.</li>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
