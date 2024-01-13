import { supabase } from '@/lib/supabase-config';
import React from 'react';

type Props = {
  cardId: number;
};

function AgreeBtn({ cardId }: Props) {
  const handleAgreeBtn = async () => {
    const { data, error } = await supabase.from('flirting_list').update({ is_matched: true }).eq('id', cardId).select();
    console.log('update : ', data);
    console.log('error : ', error);
    console.log('cardId~~~~~', cardId);
  };

  return (
    <button className="bg-customGreen w-[3rem] h-[3rem] rounded-full" onClick={handleAgreeBtn}>
      수락
    </button>
  );
}

export default AgreeBtn;

// export async function postRequest(receiver_uid) {
//   const { data, error } = await supabase.from('flirting_list').update(receiver_uid).eq("receiver_uid", receiver_uid).select();

//   if (error || null) {
//     console.log('Error creating a posts data', error);
//     throw new Error('error while fetching posts data');
//   }
//   return data;
// }

// export async function postRegister({ uid, ...registerData }: RegisterType) {
//   const { data, error } = await supabase.from('custom_users').update([registerData]).eq('uid', uid).select();

//   if (error || null) {
//     console.log('Error creating a posts data', error);
//     throw new Error('error while fetching posts data');
//   }
//   return data;
// }
