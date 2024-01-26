import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { FlirtingListType } from './flirtingListType';

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
    // [key: string]: any;
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

export type SpecificSubscribeFlirtingListCallbackType = (
  payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>
) => void;

// export type SpecificSubscribeFlirtingListCallbackType = (payload: RealtimePostgresChangesPayload<any>) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: FlirtingListPayload;
//   }>
// ) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (payload: FlirtingListPayload) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (payload: any) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: FlirtingListPayload;
//   }>
// ) => void;
// export type SpecificSubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<FlirtingListPayload>
// ) => void;

export type ChatListType = {
  id: string;
  flirting_list_id: number;
  flirting_list: {
    created_at: Date;
    flirting_message: string;
    id: number;
    status: string;
    sender_is_read_in_noti: boolean;
    receiver_is_read_in_noti: boolean;
    receiver_uid: { name: string; avatar: number; uid: string };
    sender_uid: { name: string; avatar: number; uid: string };
  };
};

export type SendMessageType = {
  subscribe_room_id: string;
  user_uid: string | undefined;
  message: string;
  user_score: number;
  another_score: number;
  user_continual_count: number;
  another_continual_count: number;
  is_read: boolean;
  favorable_rating: number | undefined;
};

export type MessageType = {
  created_at: Date;
  subscribe_room_id: string;
  user_uid: string;
  message: string;
  user_score: number;
  another_score: number;
  user_continual_count: number;
  another_continual_count: number;
  is_read: boolean;
  favorable_rating: number;
};

export type LastMessageDataType = {
  created_at: Date;
  subscribe_room_id: string | null;
  user_uid: string | null;
  message: string | null;
  is_read: boolean;
  favorable_rating: number;
};
