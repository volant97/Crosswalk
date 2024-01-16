'use client';
import { getChatList } from '@/lib/api/SupabaseApi';
import { isUserState } from '@/recoil/auth';
import { ChatListType } from '@/types/realTimeType';
import { Avatar } from '@nextui-org/react';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function chatListPage() {
  const [chatList, setChatList] = useState<ChatListType[]>();
  const getUid = useRecoilState(isUserState);
  async function data() {
    try {
      const data = await getChatList();
      setChatList(data);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }
  useEffect(() => {
    data();
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

  const statusColor = (status: string, avatar: number) => {
    switch (status) {
      case 'UNREAD':
        console.log('unread');
        return (
          <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
            <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.jpg`} alt="유저 아바타 이미지" />
          </div>
        );
      case 'READ':
        console.log('read');
        return (
          <div className="rounded-full border-gray-999 border-2 p-[0.2rem]">
            <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.jpg`} alt="유저 아바타 이미지" />
          </div>
        );
      case 'ACCEPT':
        console.log('ACCEPT');
        return (
          <div className="rounded-full border-customYellow border-2 p-[0.2rem]">
            <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.jpg`} alt="유저 아바타 이미지" />
          </div>
        );
      case 'DECLINE':
        console.log('DECLINE');
        return (
          <div className="rounded-full border-customRed border-2 p-[0.2rem]">
            <Avatar size="sm" src={`/assets/avatar/avatar${avatar}.jpg`} alt="유저 아바타 이미지" />
          </div>
        );
    }
  };

  return (
    <>
      <ul>
        {chatList?.map((list, idx) => {
          if (getUid[0].uid === list.flirting_list.sender_uid.uid) {
            return (
              <li key={idx} className="py-3 flex flex-row gap-4 justify-between">
                <div className="flex items-center">
                  {statusColor(list.flirting_list.status, list.flirting_list.receiver_uid.avatar)}
                </div>
                <div className="w-[12.5rem]">
                  <h5 className="text-black text-base font-medium">{list.flirting_list.receiver_uid.name}</h5>
                  <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
                    {list.flirting_list.flirting_message}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span>
                  <div></div>
                </div>
              </li>
            );
          } else {
            return (
              <li key={idx}>
                <div className="max-w-8">
                  <Image
                    className="rounded-[1.5rem]"
                    src={`/assets/avatar/avatar${list.flirting_list.sender_uid.avatar}.jpg`}
                    width={30}
                    height={30}
                    alt="유저 아바타 이미지"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div>
                  <h5>{list.flirting_list.sender_uid.name}</h5>
                  <div>{list.flirting_list.flirting_message}</div>
                </div>
                <div>
                  <h5>{list.flirting_list.created_at}</h5>
                  <div>{list.flirting_list.flirting_message}</div>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
