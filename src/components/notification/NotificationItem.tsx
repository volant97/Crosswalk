import Link from 'next/link';
import { UserState } from '@/recoil/user';
import { formatDate } from '@/hooks/useFormatDate';
import type { FlirtingListInNotificationType } from '@/types/flirtingListType';

const NotificationItem = ({
  notification,
  currentUser,
  userNames,
  toggleIsReadInNoticeBoardSenderSide,
  toggleIsReadInNoticeBoardReceiverSide
}: {
  notification: FlirtingListInNotificationType;
  currentUser: UserState;
  userNames: {
    sender: {
      name: string;
      uid: string;
    } | null;
    receiver: {
      name: string;
      uid: string;
    } | null;
  };
  toggleIsReadInNoticeBoardSenderSide: (id: number) => Promise<void>;
  toggleIsReadInNoticeBoardReceiverSide: (id: number) => Promise<void>;
}) => {
  const senderIsRead = notification.sender_is_read_in_noti === true;
  const receiverIsRead = notification.receiver_is_read_in_noti === true;
  const isSender = notification.sender_uid === currentUser?.id;
  const isReceiver = notification.receiver_uid === currentUser?.id;

  if ((isSender && senderIsRead) || (isReceiver && receiverIsRead)) {
    return null;
  }

  if (userNames?.sender === undefined && userNames?.receiver === undefined) {
    return (
      <div key={notification.id} className="flex flex-col item-center max-w-96 h-18 p-2 gap-1">
        <li className="flex flex-col item-center max-w-96 h-18 p-2 gap-1 ">신호 대기중...</li>
      </div>
    );
  }

  return (
    <ul key={notification.id} className="flex-col justify-center items-center text-center">
      <Link
        href={
          notification.status === 'ACCEPT'
            ? '/chat-list'
            : notification.status === 'UNREAD' ||
              (notification.status === 'READ' && currentUser?.id === userNames.sender?.uid)
            ? '/chat-list'
            : notification.status === 'UNREAD' ||
              (notification.status === 'READ' && currentUser?.id === userNames.receiver?.uid)
            ? '/request'
            : '/main'
        }
        className="flex flex-col item-center justify-center max-w-[100%] gap-1 cursor-pointer transition duration-300 ease-in-out hover:bg-[#FFD1E0]"
        onClick={() => {
          if (isSender) {
            toggleIsReadInNoticeBoardSenderSide(notification.id);
          } else if (isReceiver) {
            toggleIsReadInNoticeBoardReceiverSide(notification.id);
          }
        }}
      >
        <li className="flex flex-col justify-center w-full h-[70px] pl-[22px] pr-[22px] pt-[13px] pb-[13px] cursor-pointer gap-[5px]">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-center text-center font-medium leading-[16px] h-[20px] text-[16px] ">
              {notification.status === 'ACCEPT' ? (
                <h2 className="flex flex-col justify-center ">💚 Connected!</h2>
              ) : (
                <h2>⚡ Request</h2>
              )}
            </div>
            <p className="text-right font-Pretendard text-xs font-normal leading-none text-[#AAA] text-[12px] ">
              {formatDate(String(notification.created_at))}
            </p>
          </div>
          <div className="flex flex-row overflow-hidden  truncate ">
            <p className="text-gray-666 text-[14px] text-Pretendard font-normal leading-[19px]">
              {notification.status === 'ACCEPT'
                ? `${userNames.sender?.name}님과 ${userNames.receiver?.name}님의 신호등이 연결되었습니다!`
                : `${userNames.sender?.name}님이 ${userNames.receiver?.name}님에게 연결 요청을 보냈습니다.`}
            </p>
          </div>
        </li>
      </Link>
    </ul>
  );
};

export default NotificationItem;
