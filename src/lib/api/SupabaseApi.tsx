import { FlirtingListType } from '@/types/flirtingListType';
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

export async function postRegister({ uid, ...registerData }: RegisterType) {
  const { data, error } = await supabase.from('custom_users').update([registerData]).eq('uid', uid).select();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }
  return data;
}

export async function getFlirtingRequestData() {
  const { data, error } = await supabase.from('flirting_list').select('*').returns<FlirtingListType[]>();

  if (error || null) {
    console.log('Error creating a posts data', error);
    throw new Error('error while fetching posts data');
  }

  return data;
}

// export async function getRequestSenderData() {
//   const { data, error } = await supabase.from('flirting_list').select(
//     `
//   *, custom_users("*")
//   )
// `
//   );
//   // .eq('sender_uid', '2ff459bc-2c66-43ee-8a82-cecb523867d9');
//   console.log('나좀봐', data);
//   console.error('에러 발생:', error);
//   return data;
// }

// export async function getRequestSenderData() {
//   const { data, error } = await supabase
//     .from('custom_users')
//     .select(
//       `
//     name
//   `
//     )
//     .eq('uid', '2ff459bc-2c66-43ee-8a82-cecb523867d9');

//   console.log('나좀봐2', data);
//   console.error('에러 발생2:', error);
// }

// export async function getRequestSenderData() {
//   // 현재 로그인한 사용자의 uid (예시로 'current_user_uid'를 사용)
//   const currentUserId = 'f644160d-a927-48e6-b66e-ab319eeca12c';
//   try {
//     // Supabase의 'flirting_list' 테이블에서 데이터 가져오기
//     const { data, error } = await supabase
//       .from('flirting_list')
//       .select(
//         `
//       sender_uid,
//       custom_users:uid(*)
//     `
//       )
//       .eq('receiver_uid', currentUserId);

//     // 데이터 출력
//     console.log('젭알...!:', data);

//     // 오류가 있는 경우 오류 출력
//     if (error) {
//       console.error('Error:', error);
//     }
//   } catch (error) {
//     console.error('An unexpected error occurred:', error.message);
//   }
// }

// export async function getRequestReceiverData() {
//   // 현재 로그인한 유저의 uid (예시로 'current_user_uid'를 사용)
//   const currentUserId = 'f644160d-a927-48e6-b66e-ab319eeca12c';

//   // custom_users 테이블을 기준으로 'sender_uid'와 모든 정보를 선택
//   const { data, error } = await supabase
//     .from('custom_users')
//     .select(
//       `
//     name
//   `
//     )
//     .eq('receiver_uid', currentUserId);

//   console.log('받은 요청 정보 말이야:', data);
//   console.error('에러 발생:', error);
// }

// export async function getRequestSenderData() {
//   // 현재 로그인한 유저의 uid (예시로 'current_user_uid'를 사용)
//   const currentUserId = 'f644160d-a927-48e6-b66e-ab319eeca12c';

//   const { data: flirtingListData, error: flirtingListError } = await supabase
//     .from('flirting_list')
//     .select('sender_uid')
//     .eq('receiver_uid', currentUserId);

//   if (flirtingListError) {
//     console.error('에러 발생:', flirtingListError);
//     return;
//   }

//   // 방금 가져온 모든 sender_uid 값들을 배열로 추출
//   const senderUids = flirtingListData?.map((item) => item.sender_uid);

//   // sender_uid 값이 존재하는 경우 custom_users 테이블에서 해당 uid에 대한 이름을 가져옴
//   if (senderUids && senderUids.length > 0) {
//     const { data: userData, error: userError } = await supabase
//       .from('custom_users')
//       .select('name')
//       .in('uid', senderUids);

//     if (userError) {
//       console.error('에러 발생:', userError);
//       return;
//     }

//     console.log('받은 모든 요청을 보낸 사용자의 이름:', userData);
//   }
// }

// export async function getRequestSenderData() {
//   // 현재 로그인한 유저의 uid (예시로 'current_user_uid'를 사용)
//   const currentUserId = 'f644160d-a927-48e6-b66e-ab319eeca12c';

//   const { data: flirtingListData, error: flirtingListError } = await supabase
//     .from('flirting_list')
//     .select('sender_uid')
//     .eq('receiver_uid', currentUserId);

//   if (flirtingListError) {
//     console.error('에러 발생:', flirtingListError);
//     return;
//   }

//   // 방금 가져온 모든 sender_uid 값들을 배열로 추출
//   const senderUids = flirtingListData?.map((item) => item.sender_uid);

//   // sender_uid 값이 존재하는 경우 custom_users 테이블에서 해당 uid에 대한 이름을 가져옴
//   if (senderUids && senderUids.length > 0) {
//     const { data: userData, error: userError } = await supabase
//       .from('custom_users')
//       .select('name')
//       .in('uid', senderUids);

//     if (userError) {
//       console.error('에러 발생:', userError);
//       return;
//     }

//     // 중복된 이름을 포함한 배열 생성
//     const uniqueNames = Array.from(new Set(userData?.map((user) => user.name)));

//     console.log('받은 모든 요청을 보낸 사용자의 이름:', uniqueNames);
//   }
// }
