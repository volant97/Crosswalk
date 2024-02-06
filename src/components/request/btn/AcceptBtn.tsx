import React from 'react';
import useRequestModal from '@/components/common/modal/RequestModal';

type Props = {
  listId: number;
};

/**수락 버튼 */
function AcceptBtn({ listId }: Props) {
  const { openModal, AlertYellowModal } = useRequestModal(listId);

  /**수락 버튼 클릭시 모달창 오픈, 확인 클릭시 업데이트 */
  const handleAcceptBtn = () => {
    openModal('');
  };

  return (
    <>
      <button
        className="w-full h-full px-[20px] self-stretch bg-customGreen3 rounded-full text-[12px] font-[600] text-white leading-[20px]"
        onClick={handleAcceptBtn}
      >
        수락
      </button>
      {AlertYellowModal()}
    </>
  );
}

export default AcceptBtn;
