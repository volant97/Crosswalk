'use client';
import { getChatList } from '@/lib/api/SupabaseApi';
import { isUserState } from '@/recoil/auth';
import { ChatListType } from '@/types/realTimeType';
import { Avatar } from '@nextui-org/react';
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
  return (
    <>
      <ul>
        {chatList?.map((list, idx) => {
          if (getUid[0].uid === list.flirting_list.sender_uid.uid) {
            return (
              <li key={idx} className="flex flex-row justify-between">
                <div className="max-w-8">
                  <Avatar
                    isBordered
                    size="sm"
                    className="rounded-[1.5rem]"
                    src={`/assets/avatar/avatar${list.flirting_list.receiver_uid.avatar}.jpg`}
                    alt="유저 아바타 이미지"
                  />
                </div>
                <div className="w-[13.75rem]">
                  <h5 className="text-black text-base font-medium">{list.flirting_list.receiver_uid.name}</h5>
                  <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
                    {list.flirting_list.flirting_message}
                  </div>
                </div>
                <div>
                  <span className="text-gray-AAA">{list.flirting_list.created_at}</span>
                  {/* <div>{list.flirting_list.flirting_message}</div> */}
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
