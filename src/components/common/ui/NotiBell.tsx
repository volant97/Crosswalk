// 'use client';
// import {
//   getCustomFlirtingInNotificationListReceiverSide,
//   getCustomFlirtingInNotificationListSenderSide,
//   getFlirtingRequestData,
//   subscribeFlirtingList
// } from '@/lib/api/SupabaseApi';
// import { isUserState } from '@/recoil/auth';
// import { FlirtingListInNotificationType } from '@/types/flirtingListType';
// import Link from 'next/link';
// import React, { Fragment, useEffect, useState } from 'react';
// import { HiOutlineBell } from 'react-icons/hi2';
// import { useRecoilState } from 'recoil';

// function NotiBell() {
//   const [flirtingList, setFlirtingList] = useState<FlirtingListInNotificationType[] | null>(null);
//   const [filteredNotifications, setFilteredNotifications] = useState<FlirtingListInNotificationType[] | null>(null);
//   const [currentUser, setCurrentUser] = useRecoilState(isUserState);
//   console.log('currentUser', currentUser.uid); // 현재 로그한 유저 uid

//   const fetchNotificationData = async () => {
//     try {
//       const userDataReceiverSide = await getCustomFlirtingInNotificationListReceiverSide();
//       const userDataSenderSide = await getCustomFlirtingInNotificationListSenderSide();
//       if (userDataReceiverSide !== null || userDataSenderSide !== null) {
//         const receiverUid = userDataReceiverSide[0].receiver_uid;
//         const senderUid = userDataSenderSide[0].sender_uid;
//         if (currentUser.uid === receiverUid) {
//           const data = await getCustomFlirtingInNotificationListReceiverSide();
//           setFlirtingList(data);
//           console.log('data r', data);
//         } else if (currentUser.uid === senderUid) {
//           const data = await getCustomFlirtingInNotificationListSenderSide();
//           setFlirtingList(data);
//         }
//       }
//     } catch (error) {
//       // openModal('서버와의 통신 중 에러가 발생했습니다.');
//     }
//   };

//   useEffect(() => {
//     // callback
//     subscribeFlirtingList((payload) => {
//       console.log('payload입니다:', payload);
//       fetchNotificationData();
//     });
//     fetchNotificationData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     // <div className="absolute right-0 cursor-pointer">
//     //   <Link href="/notification">
//     //     <HiOutlineBell size={25} />
//     //   </Link>
//     // </div>
//     <Fragment>
//       {Number(flirtingList?.length) > 0 ? (
//         <ul className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto scrollbar-hide">
//           {flirtingList?.find((item) => {
//             const senderIsRead = item.sender_is_read_in_noti;
//             const receiverIsRead = item.receiver_is_read_in_noti;
//             const isSender = item.sender_uid === currentUser.uid;
//             const isReceiver = item.receiver_uid === currentUser.uid;

//           })}
//             return (
//               <React.Fragment key={item.id}>
//                 {isSender ? (
//                   senderIsRead ? (
//                     <p>알림없음</p>
//                   ) : (
//                     <p>알림옴</p>
//                   )
//                 ) : receiverIsRead ? (
//                   <p>알림없음</p>
//                 ) : (
//                   <p>알림옴</p>
//                 )}
//                 {/* 보내는사람 Ui */}
//                 {/* 받는 사람 ui */}
//               </React.Fragment>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]">
//           <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 cursor-pointer">받은 알림이 없습니다.</li>
//         </div>
//       )}
//     </Fragment>
//   );
// }

// export default NotiBell;
