'use client';

import { getChatList, getMessage, postMessage, subscribeChatRoom, untrackChatRoom } from '@/lib/api/SupabaseApi';
import { isUserState } from '@/recoil/auth';
import { MessageType } from '@/types/realTimeType';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ChatFunction() {
  const defaultMessageData = {
    // Todo created_at이 없었음
    // 기존 created_at : Date  수정 후 created_at : new Date()
    created_at: new Date(),
    subscribe_room_id: '',
    user_uid: '',
    message: '',
    is_read: false,
    user_score: 0,
    another_score: 0,
    user_continual_count: 0,
    another_continual_count: 0,
    favorable_rating: 0
  };

  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [sendMessageData, setSendMessageData] = useState<MessageType>(defaultMessageData);
  const [getUid, setGetUid] = useRecoilState(isUserState);

  async function data() {
    try {
      const chatList = await getChatList();
      // console.log(chatList);

      chatList?.forEach((list) => {
        if (list.flirting_list.status === 'ACCEPT') {
          setSendMessageData((prevValue: any) => ({
            ...prevValue,
            user_uid: getUid.uid,
            message: '테스트 진행 중',
            subscribe_room_id: list.id
          }));
          return sendMessageData;
        }
        // console.log(sendMessageData);
        // console.log(list);
      });
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }

  async function getData(subscribe_room_id: string) {
    try {
      const getMessageData = await getMessage(subscribe_room_id);
      setMessageData(getMessageData);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }

  useEffect(() => {
    // 컴포넌트 마운트 시에 구독
    subscribeChatRoom(sendMessageData.subscribe_room_id, (payload: any) => {
      getData(sendMessageData.subscribe_room_id);
    });

    // 컴포넌트 언마운트 시에 구독 해제
    return () => {
      untrackChatRoom(sendMessageData.subscribe_room_id);
    };
  }, [getUid, sendMessageData.subscribe_room_id]);

  return (
    <div>
      <button onClick={data}>데이터 담기</button>
      <br />
      <button onClick={() => postMessage(sendMessageData)}>보내기</button>
      <br />
      {messageData.map((message, idx) => {
        // console.log(message);
        return <div key={idx}>{message.message}</div>;
      })}
    </div>
  );
}
