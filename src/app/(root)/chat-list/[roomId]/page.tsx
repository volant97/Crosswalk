/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import ChatHeader from '@/components/message/ChatHeader';
import ChatRoom from '@/components/message/ChatRoom';
import {
  changeMessageToRead,
  getChatList,
  getMessage,
  subscribeChatRoom,
  untrackChatRoom
} from '@/lib/api/SupabaseApi';
import { userState } from '@/recoil/user';
import { ChatListType, MessageType } from '@/types/realTimeType';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function ChatRoomPage() {
  const pathname = usePathname();
  const roomId = pathname.split('/')[2];
  const [getUid, setGetUid] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useState<ChatListType>();

  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const favorableRating = messageData[messageData.length - 1]?.favorable_rating;

  async function data() {
    try {
      const chatList = await getChatList();

      chatList?.forEach((list) => {
        if (list.id === roomId) {
          setRoomInfo(list);
        }
      });
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }

  useEffect(() => {
    data();
  }, [messageData]);

  async function getData(subscribe_room_id: string) {
    try {
      const getMessageData = await getMessage(subscribe_room_id);
      setMessageData(getMessageData);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.1');
    }
  }

  async function handleToRead(subscribe_room_id: string) {
    try {
      if (getUid) {
        await changeMessageToRead(getUid.id, subscribe_room_id);
      }
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  }

  useEffect(() => {
    // 컴포넌트 마운트 시에 구독
    subscribeChatRoom(roomId, (payload: any) => {
      getData(roomId);
      handleToRead(roomId);
    });

    getData(roomId);
    handleToRead(roomId);

    // 컴포넌트 언마운트 시에 구독 해제
    return () => {
      untrackChatRoom(roomId);
    };
  }, [getUid, roomId]);

  return (
    <div className="h-screen">
      <ChatHeader roomId={roomId} roomInfo={roomInfo} getUid={getUid} favorableRating={favorableRating} />
      <ChatRoom roomId={roomId} roomInfo={roomInfo} getUid={getUid} messageData={messageData} />
    </div>
  );
}

export default ChatRoomPage;
