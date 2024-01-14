'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getCustomFlirtingInNotificationList, subscribeFlirtingList, updateIsReadInNoti } from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';

const Notification: React.FC = () => {
  const { openModal } = useAlertModal();
  const [flirtingList, setFlirtingList] = useState<FlirtingListInNotificationType[] | null>(null);
  const [currentUser, setCurrentUser] = useRecoilState(isUserState);
  console.log('currentUser', currentUser.uid); // 현재 로그한 유저 uid

  //랜딩시 통신
  const fetchRequestSenderData = async () => {
    try {
      const userData = await getCustomFlirtingInNotificationList();
      console.log(`내가 보낸이일때,받는이일때 데이터 :`, userData);

      const filteredData = userData.filter((item) => {
        const isSender = item.sender_uid === currentUser.uid;
        const isReceiver = item.receiver_uid === currentUser.uid;

        if (isReceiver) {
          return true;
        } else if (isSender) {
          // 보낸 요청에 대한 알림
          return true; // 발신자에게 표시되지 않도록 제외
        }
      });
      setFlirtingList(filteredData);
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
      }
    } catch (error) {
      openModal('알림을 읽는 중에 오류가 발생했습니다.');
    }
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
              const isUnread = item.status === 'UNREAD' && item.is_read_in_noti === false;
              const isConnected = item.status === 'ACCEPT' && item.is_read_in_noti === false;
              const isSender = item.sender_uid === currentUser.uid;
              const isReceiver = item.receiver_uid === currentUser.uid;
              const commonProps = {
                className:
                  'flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]'
              };
              if (item.is_read_in_noti) {
                // is_read_in_noti가 true이면 렌더링하지 않음
                return null;
              }
              return (
                <>
                  {/* 보내는사람 Ui */}
                  {isSender && isConnected && (
                    <Link
                      href={'/chat-list'}
                      key={item.id}
                      {...commonProps}
                      onClick={() => toggleIsReadInNoticeBoard(item.id)}
                    >
                      {isConnected && (
                        <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                          <div className="flex justify-between">
                            <div className="text-base font-normal font-medium leading-none pb-1">
                              <p>💚 Connected!</p>
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
                      )}
                    </Link>
                  )}
                  {/* 받는 사람 ui */}
                  {isReceiver && (
                    <Link
                      href={item.status === 'UNREAD' ? '/request' : '/chat-list'}
                      key={item.id}
                      {...commonProps}
                      onClick={() => toggleIsReadInNoticeBoard(item.id)}
                    >
                      <li className="flex flex-col item-center max-w-96 h-18 p-1 gap-1 cursor-pointer">
                        <div className="flex justify-between">
                          <div className="text-base font-normal font-medium leading-none pb-1">
                            <p>{isUnread ? '⚡ Request' : isConnected ? '💚 Connected' : ''}</p>
                          </div>
                          <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-row overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                          <div>{item.custom_users.name}</div>
                          <p>
                            {isUnread
                              ? '님이 crosswalk 연결 요청을 보냈습니다.'
                              : isConnected
                              ? '님과 신호등이 연결되었습니다!'
                              : ''}
                          </p>
                        </div>
                      </li>
                    </Link>
                  )}
                </>
              );
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
