'use client';
import { useRecoilValue } from 'recoil';
import { UserState, userState } from '@/recoil/user';
import { useRouter } from 'next/navigation';
import useChatListModal from '@/components/common/modal/ChatListModal';
import { ChatStatusColor } from '@/components/message/ChatStatusColor';
import { formatDate } from '../../hooks/useFormatDate';
import type { ChatListType } from '@/types/realTimeType';
import type { LastMessageArrayType } from '@/types/lastMessageArrayType';
import useAlertModal from '../common/modal/AlertModal';

export const RenderListItem = ({
  list,
  idx,
  lastMsg
}: {
  list: ChatListType;
  idx: number;
  lastMsg: LastMessageArrayType;
}) => {
  const router = useRouter();
  const { openModal: openChatListModal, AlertChatListModal } = useChatListModal();
  const { openModal: openAlertModal, AlertModal } = useAlertModal();

  const getUid = useRecoilValue<UserState>(userState);
  const isSender = getUid?.id === list.flirting_list.sender_uid.uid;
  const otherUser = isSender ? list.flirting_list.receiver_uid : list.flirting_list.sender_uid;
  const statusMessage = isSender ? '상대방의 수락을 기다리고 있어요.' : '회원님의 수락을 기다리고 있어요.';

  const routerLink = (linkId: string, status: string) => {
    if (status === 'ACCEPT' || status === 'SOULMATE') {
      router.push(`/chat-list/${linkId}`);
    } else if (status === 'DECLINE') {
      return openChatListModal();
    }
  };

  return (
    <li
      key={idx}
      className={`py-3 flex flex-row gap-0 justify-between cursor-pointer px-[20px] max-h-[68px] transition duration-300 ease-in-out hover:bg-[#FFD1E0] ${
        isSender ? '' : 'px-[20px]'
      } `}
      onClick={() => {
        if (!lastMsg) return;
        if (lastMsg[idx] === null) {
          return openAlertModal(
            <>
              <p>요청받은 사람이 확인중이에요.</p>
              <p>신호등이 켜지길 기다려주세요.</p>
            </>
          );
        } else {
          routerLink(list.id, list.flirting_list.status);
        }
      }}
    >
      <div className="flex items-center">
        {ChatStatusColor(
          list.flirting_list.status,
          isSender ? list.flirting_list.receiver_uid.avatar : list.flirting_list.sender_uid.avatar,
          otherUser.uid,
          otherUser.user_img
        )}
      </div>
      <div className="w-[12.5rem]">
        <h5 className="text-black text-base font-medium">{otherUser.name}</h5>
        <div className="w-full text-gray-666 text-sm font-normal text-ellipsis overflow-hidden">
          {lastMsg && lastMsg[idx] !== undefined ? (
            lastMsg[idx] !== null ? (
              <div className="block w-full text-gray-666 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[20px]">
                {lastMsg[idx]?.message}
              </div>
            ) : (
              <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">{statusMessage}</div>
            )
          ) : (
            <div className="w-full text-gray-666 text-sm text-ellipsis overflow-hidden">로딩중...</div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end w-[55px]">
        <span className="text-xs text-gray-AAA">
          {lastMsg && lastMsg[idx] !== undefined ? (
            lastMsg[idx] !== null ? (
              formatDate(String(lastMsg[idx]?.created_at))
            ) : (
              <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">대기중</div>
            )
          ) : (
            <div className="w-full text-xs text-gray-AAA font-normal text-ellipsis overflow-hidden">...</div>
          )}
        </span>
        {lastMsg &&
          lastMsg[idx] &&
          lastMsg[idx]?.user_uid !== getUid?.id &&
          !lastMsg[idx]?.is_read &&
          list.flirting_list.status !== 'DECLINE' && (
            <div className="flex justify-center items-center w-[20px] h-[20px] font-normal rounded-full bg-customGreen3 text-white text-[11px] leading-normal">
              +1
            </div>
          )}
      </div>
      {AlertChatListModal()}
      {AlertModal()}
    </li>
  );
};
