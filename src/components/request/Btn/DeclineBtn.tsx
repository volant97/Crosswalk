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
    openModal(
      `
      아쉬워요.
      신호등에 빨간색 불이 들어왔네요.
      더 좋은 만남을 기대할게요!`
    );
  };

  return (
    <>
      {AlertRedModal()}
      <button
        className="w-full h-full px-[20px] self-stretch bg-customYellow rounded-full text-[12px] font-[600] text-black leading-[20px]"
        onClick={handleDeclineBtn}
      >
        거절
      </button>
    </>
  );
}

export default DeclineBtn;
