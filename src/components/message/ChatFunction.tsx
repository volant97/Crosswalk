'use client';

import { getChatList, getMessage, postMessage, subscribeChatRoom, untrackChatRoom } from '@/lib/api/SupabaseApi';
import { isUserState } from '@/recoil/auth';
import { MessageType } from '@/types/realTimeType';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ChatFunction() {
  const defaultMessageData = {
    subscribe_room_id: '',
    user_uid: '',
    message: '',
    congratulations_message: 0,
    total_chat_count: 0,
    is_read: false
  };

  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [sendMessageData, setSendMessageData] = useState<MessageType>(defaultMessageData);
  const [getUid, setGetUid] = useRecoilState(isUserState);

  async function data() {
    try {
      const chatList = await getChatList();
      console.log(chatList);

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
        console.log(sendMessageData);
        console.log(list);
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
        console.log(message);
        return <div key={idx}>{message.message}</div>;
      })}
    </div>
  );
}
