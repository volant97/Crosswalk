'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import notificationData from '../../data/notification_data.json';
import { IoIosArrowRoundBack } from 'react-icons/io';
//----
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { FlirtingListType } from '@/types/flirtingListType';
import { getFlirtingRequestData } from '@/lib/api/SupabaseApi';
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SERVICE_KEY || '');

// console.log({ client });
const Notification: React.FC = () => {
  const [flirtingList, setFlirtingList] = useState<FlirtingListType[] | null>(null);
  const [realTimeTrigger, setRealTimeTrigger] = useState<boolean>(false);
  // console.log('???');
  // async function getData() {
  //   const { data, error } = await client.from('flirting_list').select();
  //   console.log({ data });
  // }
  // getData();

  // 아래 식 질문
  // const fetchRequestSenderData = async () => {
  //   if (flirtingList) {
  //     const senderUids = flirtingList.map((item) => item.sender_uid);
  //     console.log('sender uids:', senderUids);

  //     // 각 senderUid에 대해 custom_users 테이블에서 uid와 name을 가져오기
  //     for (const senderUid of senderUids) {
  //       const { data: userData, error: userError } = await supabase
  //         .from('custom_users')
  //         .select('uid, name')
  //         // .select('*')
  //         .eq('uid', senderUid);

  //       if (userError) {
  //         console.error('에러 발생:', userError);
  //         return;
  //       }

  //       console.log(`보낸이 이름 데이터 (${senderUid}):`, userData);
  //     }
  //   }
  // };

  // const fetchRequestSenderData = async () => {
  //   if (flirtingList) {
  //     const senderUids = flirtingList.map((item) => item.sender_uid);
  //     console.log('sender uids:', senderUids);

  //     for (const senderUid of senderUids) {
  //       const { data: userData, error: userError } = await client
  //         .from('custom_users')
  //         .select('uid, name, mbti')
  //         .eq('uid', senderUid);

  //       if (userError) {
  //         console.error('에러 발생:', userError);
  //         return;
  //       }

  //       console.log(`보낸이 이름 데이터 (${senderUid}):`, userData);
  //     }
  //   }
  // };

  const fetchRequestSenderData = async () => {
    const { data: userData, error: userError } = await client
      .from('flirting_list')
      // .select('flirting_message, custom_users(name)');
      .select('flirting_message, custom_users!flirting_list_sender_uid_fkey(name)');
    // .select('flirting_message, custom_users!flirting_list_receiver_uid_fkey(name)');
    if (userError) {
      console.error('에러 발생:', userError);
      return;
    }

    console.log(`보낸이 이름 데이터 :`, userData);
  };

  const fetchFlirtingRequestData = async () => {
    const data = await getFlirtingRequestData();
    console.log('data!!!!', data);
    if (data) {
      setFlirtingList(data);
    }
  };

  // const fetchRequestSenderData = async () => {
  //   const data = await getRequestSenderData();
  //   console.log('보낸이 이름 데이터', data);
  // };

  useEffect(() => {
    // console.log('???');
    // async function getData() {
    //   const { data, error } = await client.from('flirting_list').select();
    //   console.log({ data });
    // }
    // getData();
    const channelA: RealtimeChannel = client
      .channel('room1')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'flirting_list'
        },
        (payload) => {
          console.log({ payload });
          setRealTimeTrigger(!realTimeTrigger);
        }
      )
      .subscribe();
    fetchFlirtingRequestData();
    fetchRequestSenderData();
  }, [realTimeTrigger]);

  // if (!flirtingList) return;
  // console.log('0000000000', flirtingList[0].flirting_message);

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
  // console.log('ya!!', flirtingList[0].flirting_message);
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
            {/* 디자이너 기존 시안 */}
            {flirtingList.map((item) => {
              return (
                <Link
                  key={item.id}
                  href="/message"
                  className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
                >
                  <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="text-base font-normal font-medium leading-none">
                        {/* {
                          notificationCategory.find((noticeCategory) => noticeCategory.id === item.notice_category)
                            ?.text
                        } */}
                      </p>
                      <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA]">
                        {formatTime(item.created_at)}
                      </p>
                    </div>
                    <div className="overflow-hidden text-Pretendard text-sm font-normal leading-relaxed truncate text-[#666]">
                      {/* {item.name} */} 새로운 신호등이 연결되었습니다!
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
