import { useCallback } from 'react';
import { updateIsReadInNotiSenderSide, updateIsReadInNotiReceiverSide } from '@/lib/api/SupabaseApi';

export const useToggleIsReadInNoticeBoard = (openModal: (newTitle: React.ReactNode) => void) => {
  const toggleIsReadInNoticeBoardSenderSide = useCallback(
    async (id: number) => {
      try {
        if (id !== null) {
          await updateIsReadInNotiSenderSide(id);
        }
      } catch (error) {
        openModal('알림을 읽는 중에 오류가 발생했습니다.');
      }
    },
    [openModal]
  );

  const toggleIsReadInNoticeBoardReceiverSide = useCallback(
    async (id: number) => {
      try {
        if (id !== null) {
          await updateIsReadInNotiReceiverSide(id);
        }
      } catch (error) {
        openModal('알림을 읽는 중에 오류가 발생했습니다.');
      }
    },
    [openModal]
  );

  return { toggleIsReadInNoticeBoardSenderSide, toggleIsReadInNoticeBoardReceiverSide };
};

export default useToggleIsReadInNoticeBoard;
