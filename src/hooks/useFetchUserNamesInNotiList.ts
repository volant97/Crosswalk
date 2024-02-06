// import { FlirtingListInNotificationType } from '@/types/flirtingListType';
// import { useEffect } from 'react';

// export const useFetchUserNamesNotiList = (
//   notificationData: FlirtingListInNotificationType[],
//   getUser1NameNotification: (notification: FlirtingListInNotificationType) => Promise<any>,
//   getUser2NameNotification: (notification: FlirtingListInNotificationType) => Promise<any>,
//   setUserNames: React.Dispatch<
//     React.SetStateAction<
//       {
//         sender: {
//           name: string;
//           uid: string;
//         } | null;
//         receiver: {
//           name: string;
//           uid: string;
//         } | null;
//       }[]
//     >
//   >,
//   openModal: (newTitle: React.ReactNode) => void
// ) => {
//   useEffect(() => {
//     const fetchUserNames = async () => {
//       try {
//         const names = await Promise.all(
//           notificationData.map(async (notification) => {
//             const senderData = await getUser1NameNotification(notification);
//             console.log('sender name', senderData);
//             const receiverData = await getUser2NameNotification(notification);
//             console.log('rev name', receiverData);
//             return {
//               sender: {
//                 name: senderData[0]?.name || 'unknown',
//                 uid: senderData[0]?.uid || 'unknown'
//               },
//               receiver: {
//                 name: receiverData[0]?.name || 'unknown',
//                 uid: receiverData[0]?.uid || 'unknown'
//               }
//             };
//           })
//         );

//         setUserNames(names);
//         console.log('names arr', names);
//       } catch (error) {
//         // openModal('서버와의 통신 중 에러가 발생했습니다.');
//       }
//     };

//     if (notificationData.length > 0) {
//       fetchUserNames();
//     }
//   }, [notificationData, getUser1NameNotification, getUser2NameNotification, setUserNames, openModal]);
// };

// export default useFetchUserNamesNotiList;
