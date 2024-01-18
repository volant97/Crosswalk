import useRequestModal from '@/components/common/modal/RequestModal';
import React from 'react';

type Props = {
  listId: number;
};

/**수락 버튼 */
function AcceptBtn({ listId }: Props) {
  const { openModal, AlertYellowModal } = useRequestModal(listId);

  /**수락 버튼 클릭시 모달창 오픈, 확인 클릭시 업데이트 */
  const handleAcceptBtn = () => {
    openModal(
      `축하합니다!
    신호등에 노란색 불이 켜졌어요.
    대화를 나누고 호감도를 올려보세요!`
    );
  };

  return (
    <>
      <button
        className="w-full h-full px-[20px] self-stretch bg-customGreen rounded-full text-[12px] font-[600] text-black leading-[20px]"
        onClick={handleAcceptBtn}
      >
        수락
      </button>
      {AlertYellowModal()}
    </>
  );
}

export default AcceptBtn;
