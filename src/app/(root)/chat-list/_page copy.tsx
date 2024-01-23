// 'use client';
// import Page from '@/components/layout/Page';
// import { ChatStatusColor } from '@/components/message/ChatStatusColor';
// import { getChatList, getLastMessage, subscribeChatList, untrackChatList } from '@/lib/api/SupabaseApi';
// import { UserState, userState } from '@/recoil/user';
// import { ChatListType, MessageType } from '@/types/realTimeType';
// import { format, formatDistanceToNow } from 'date-fns';
// import { ko } from 'date-fns/locale';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';

// export default function ChatListPage() {
//   const [chatList, setChatList] = useState<ChatListType[]>();
//   const [getUid, setGetUid] = useRecoilState<UserState>(userState);
//   const [lastMessage, setLastMessage] = useState<MessageType[]>([]);
//   const router = useRouter();
//   async function data() {
//     try {
//       const data = await getChatList();
//       setChatList(data);
//     } catch (error) {
//       alert('서버와의 통신을 실패했습니다.');
//     }
//   }
//   async function lastData(subscribe_room_id: string) {
//     try {
//       const data = await getLastMessage(subscribe_room_id);
//       console.log(data);
//       console.log(data[0]);
//       const test = data[0];
//       setLastMessage((prev: any) => [...prev, test]);
//     } catch (error) {
//       alert('서버와의 통신을 실패했습니다.');
//     }
//   }

//   useEffect(() => {
//     subscribeChatList((payload: any) => {
//       data();
//     });

//     data();
//     // 컴포넌트 언마운트 시에 구독 해제
//     return () => {
//       untrackChatList();
//     };
//   }, [getUid?.id]);

//   const formatDate = (date: string) => {
//     const d = new Date(date);
//     const now = Date.now();
//     const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
//     if (diff < 60 * 1) {
//       return '방금 전';
//     }
//     if (diff < 60 * 60 * 24 * 3) {
//       const distanceString = formatDistanceToNow(d, { addSuffix: true, locale: ko, includeSeconds: true });
//       return distanceString.replace(/^약\s*/, ''); // "약" 부분을 정규식을 사용하여 제거
//     }
//     return format(d, 'PPP EEE p', { locale: ko });
//   };

//   const routerLink = (linkId: string, status: string) => {
//     if (status === 'ACCEPT') {
//       router.push(`/chat-list/${linkId}`);
//     } else return alert('신호 대기 중 입니다!');
//   };
//   return (
//     <Page noNavBar>
//       {!chatList ? (
//         <div className="h-screen flex items-center justify-center">대화할수있는 방이 없어요</div>
//       ) : (
//         <ul className="px-5">
//           {chatList?.map((list, idx) => {
//             if (getUid?.id === list.flirting_list.sender_uid.uid) {
//               return (
//                 <li
//                   key={idx}
//                   className="py-3 flex flex-row gap-4 justify-between cursor-pointer"
//                   onClick={() => {
//                     routerLink(list.id, list.flirting_list.status);
//                   }}
//                 >
//                   <div className="flex items-center">
//                     {ChatStatusColor(list.flirting_list.status, list.flirting_list.receiver_uid.avatar)}
//                   </div>
//                   <div className="w-[12.5rem] ml-[-60px]">
//                     <h5 className="text-black text-base font-medium">{list.flirting_list.receiver_uid.name}</h5>
//                     <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
//                       {lastMessage[0] && list.id === lastMessage[0]?.subscribe_room_id
//                         ? lastMessage[0]?.message
//                         : list.flirting_list.flirting_message}
//                       {/* {list.flirting_list.flirting_message} */}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span>
//                     <div></div>
//                   </div>
//                 </li>
//               );
//             } else if (getUid?.id === list.flirting_list.receiver_uid.uid && list.flirting_list.status === 'ACCEPT') {
//               return (
//                 <li
//                   key={idx}
//                   className="py-3 flex flex-row gap-4 justify-between cursor-pointer"
//                   onClick={() => {
//                     router.push(`/chat-list/${list.id}`);
//                   }}
//                 >
//                   <div className="flex items-center">
//                     {ChatStatusColor(list.flirting_list.status, list.flirting_list.sender_uid.avatar)}
//                   </div>
//                   <div className="w-[12.5rem] ml-[-60px]">
//                     <h5 className="text-black text-base font-medium">{list.flirting_list.sender_uid.name}</h5>
//                     <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden ">
//                       {list.flirting_list.flirting_message}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <span className="text-xs text-gray-AAA">{formatDate(list.flirting_list.created_at)}</span>
//                     <div></div>
//                   </div>
//                 </li>
//               );
//             }
//           })}
//         </ul>
//       )}
//     </Page>
//   );
// }
