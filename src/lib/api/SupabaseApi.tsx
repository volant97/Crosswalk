import { supabase } from '../supabase-config';

import type { RegisterType } from '@/types/registerType';

export async function getAllData(): Promise<RegisterType[]> {
  const { data, error } = await supabase.from('custom_users').select().returns<RegisterType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function postRegister({ uid, ...registerData }: RegisterType) {
  const { data, error } = await supabase.from('custom_users').update([registerData]).eq('uid', uid).select();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function sendFlirting(senderUid: string | null, message: string, recevierUid: string | null) {
  const { data, error } = await supabase.from('flirting_list').insert({
    created_at: new Date(),
    flirting_message: message,
    receiver_uid: recevierUid,
    sender_uid: senderUid,
    is_matched: null,
    is_read_in_noti: false
  });

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  console.log('data', data);
  return data;
}
