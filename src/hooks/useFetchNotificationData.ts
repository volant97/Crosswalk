import { getNotificationDetail } from '@/lib/api/SupabaseApi';
import { FlirtingListInNotificationType } from '@/types/flirtingListType';

export const useFetchNotificationData = (
  setNotificationData: React.Dispatch<React.SetStateAction<FlirtingListInNotificationType[]>>, // 쉼표 추가
  openModal: (newTitle: React.ReactNode) => void
) => {
  const fetchNotificationData = async () => {
    try {
      const data = await getNotificationDetail();
      setNotificationData(data);
    } catch (error) {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  return fetchNotificationData;
};

export default useFetchNotificationData;
