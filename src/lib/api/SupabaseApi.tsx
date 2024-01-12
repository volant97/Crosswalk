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

export async function sendFlirting(senderUid: string | null, message: string, recevierUid: string) {
  const { data, error } = await supabase
    .from('flirting_list')
    .insert([{ sender_uid: senderUid, flirting_message: message, receiver_uid: recevierUid, created_at: new Date() }]);

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  console.log('data', data);
  return data;
}
