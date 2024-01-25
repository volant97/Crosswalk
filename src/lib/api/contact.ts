import { supabase } from '../supabase-config';

// export async function sendFlirting(senderUid: string, message: string, recevierUid: string): Promise<void> {
//   const { data, error } = await supabase.from('flirting_list').insert({
//     sender_uid: senderUid,
//     flirting_message: message,
//     receiver_uid: recevierUid,
//     created_at: new Date().toISOString(),
//     sender_is_read_in_noti: false,
//     status: 'UNREAD',
//     receiver_is_read_in_noti: false
//   });

//   if (error || null) {
//     console.error('Error creating a posts data', error);
//     throw new Error('error while fetching posts data');
//   }
// }
