import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type SubscribeFlirtingListCallbackType = (
  payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>
) => void;
