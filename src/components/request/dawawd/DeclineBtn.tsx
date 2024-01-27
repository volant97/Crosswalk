import useRequestModal from '@/components/common/modal/RequestModal';
import { supabase } from '@/lib/supabase-config';
import React from 'react';

type Props = {
  listId: number;
};

/**거절 버튼 */
function DeclineBtn({ listId }: Props) {
  const { openModal, AlertRedModal } = useRequestModal(listId);

  /**거절 버튼 클릭시 모달창 오픈, 확인 클릭시 업데이트*/
  const handleDeclineBtn = async () => {
    openModal('');
  };

  return (
    <>
      {AlertRedModal()}
      <button
        className="w-full h-full px-[20px] self-stretch bg-gray-E9 rounded-full text-[12px] font-[600] text-gray-666 leading-[20px]"
        onClick={handleDeclineBtn}
      >
        거절
      </button>
    </>
  );
}

export default DeclineBtn;
