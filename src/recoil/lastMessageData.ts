import { LastMessageDataType, MessageType } from '@/types/realTimeType';
import { atom } from 'recoil';

/** 각 채팅방에서의 마지막 메세지 데이터 */
export const LastMessageState = atom<LastMessageDataType>({
  key: 'lastMessageData',
  default: {
    created_at: new Date() || null,
    subscribe_room_id: null,
    user_uid: null,
    message: null,
    is_read: false
  }
});
