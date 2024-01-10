import { supabase } from '../supabase-config';

import { RegisterType } from '@/types/registerType';

export async function getAllData(): Promise<RegisterType[]> {
  const { data, error } = await supabase.from('custom_users').select().returns<RegisterType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function postRegister(registerData: RegisterType) {
  const { data, error } = await supabase.from('custom_users').insert([registerData]).select();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

// const { data } = await supabase.from('countries').select().returns<RegisterType>()
