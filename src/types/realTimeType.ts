import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type SubscribeFlirtingListCallbackType = (
  payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>
) => void;

export type ChatListType = {
  room_id: string;
  flirting_list_id: number;
};
