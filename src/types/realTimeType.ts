import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// export type SubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: any;
//   }>
// ) => void;

export type FlirtingListPayload = {
  commit_timestamp: string;
  errors: null | any;
  eventType: string;
  new: {
    [key: string]: any;
    created_at: Date;
    flirting_message: string;
    id: number;
    sender_is_read_in_noti: boolean;
    receiver_is_read_in_noti: boolean;
    receiver_uid: string;
    sender_uid: string;
    status: string;
  };
  old: { id: number };
  schema: string;
  table: string;
};

export type SpecificSubscribeFlirtingListCallbackType = (payload: FlirtingListPayload) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (payload: any) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: FlirtingListPayload;
//   }>
// ) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<FlirtingListPayload>
// ) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: any;
//   }>
// ) => void;

export type ChatListType = {
  room_id: string;
  flirting_list_id: number;
};
