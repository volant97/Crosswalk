import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type SubscribeFlirtingListCallbackType = (
  payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>
) => void;

export type ChatListType = {
  room_id: string;
  flirting_list_id: number;
  flirting_list: {
    created_at: string;
    flirting_message: string;
    id: number;
    is_matched: boolean;
    is_read_in_noti: boolean;
    receiver_uid: { name: string; avatar: number; uid: string };
    sender_uid: { name: string; avatar: number; uid: string };
  };
};
