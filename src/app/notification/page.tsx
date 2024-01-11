import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import notificationData from '../../data/notification_data.json';
import { IoIosArrowRoundBack } from 'react-icons/io';
//----
import { RealtimeChannel, createClient } from '@supabase/supabase-js';

const Notification: React.FC = () => {
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');

  const channelA: RealtimeChannel = client
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'flirting_list'
      },
      (payload) => console.log(payload)
    )
    .subscribe();

  // 1친구 요청
  // sender_uid in flirting_list
  // receiver_uid in flirting_list
  // created_at in flirting_list
  // 2메세지
  // room_id in message
  // sender_uid in message
  // receiver_uid in message
  // created_at in message
  // 3매칭 알림
  // flirting_list_id in chat_list => 이동 포트 OR room_id in message
  // created_at in ?

  // 왠지 matched의 유무를 boolean으로 관리해야할것같다. 데이터 형태는? 어느 table에?
  // custom_users [ matched{ sender_uid: text, is_matched: false }] ?

  // Table[{}, {}, {}]

  interface NotificationItem {
    id: string;
    name: string;
    sender_uid: string;
    receiver_uid: string;
    created_at: string;
    room_id: string;
    flirting_list_id: string;
    matched: boolean;
    notice1: string;
    notice2: string;
    notice3: string;
    notice_category: string;
  }

  const { notification } = notificationData;
  const notificationCategory = [
    { id: '1', text: '⚡ Request' },
    { id: '2', text: '💜 Message' },
    { id: '3', text: '🟡 Yellow Light' }
  ];
  const noticeText = [
    { id: '1', text: '님이 crosswalk 연결 요청을 보냈습니다.' },
    { id: '2', text: '님이 메세지를 보냈습니다.' },
    { id: '3', text: '님과 신호등이 연결되었습니다!' }
  ];

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
        <ul className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
          {/* 디자이너 기존 시안 */}
          {notification.map((item) => {
            return (
              <Link
                key={item.id}
                href="/message"
                className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
              >
                <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer">
                  <div className="flex justify-between">
                    <p className="text-base font-normal font-medium leading-none">
                      {notificationCategory.find((noticeCategory) => noticeCategory.id === item.notice_category)?.text}
                    </p>
                    <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                      {formatTime(item.created_at)}
                    </p>
                  </div>
                  <div className="overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                    {item.name}
                    {noticeText.find((notice) => notice.id === item.notice_category)?.text}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
