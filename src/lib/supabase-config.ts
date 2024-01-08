import { createClient } from '@supabase/supabase-js/dist/module';
import { Database, Tables } from './supabase';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SERVICE_KEY as string
);

export type { Database, Tables };
