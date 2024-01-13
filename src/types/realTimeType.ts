import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// export type SubscribeFlirtingListCallbackType = (
//   payload: RealtimePostgresChangesPayload<{
//     [key: string]: any;
//   }>
// ) => void;

type FlirtingListPayload = {
  commit_timestamp: string;
  errors: null | any;
  eventType: string;
  new: {
    created_at: string;
    flirting_message: string;
    id: number;
    is_read_in_noti: boolean;
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
    [key: string]: FlirtingListPayload;
  }>
) => void;
