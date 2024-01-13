import React from 'react';

function AgreeBtn() {
  const handleAgreeBtn = () => {};

  return <button className="bg-customGreen w-[3rem] h-[3rem] rounded-full">수락</button>;
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
