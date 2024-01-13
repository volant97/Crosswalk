import { supabase } from '@/lib/supabase-config';
import React from 'react';

type Props = {
  listId: number;
};

/**거절 버튼 */
function DeclineBtn({ listId }: Props) {
  /**거절 버튼 클릭시 업데이트 */
  const handleDeclineBtn = async () => {
    await supabase.from('flirting_list').update({ status: 'DECLINE' }).eq('id', listId).select();
  };

  return (
    <button className="bg-customYellow w-[3rem] h-[3rem] rounded-full" onClick={handleDeclineBtn}>
      거절
    </button>
  );
}

export default DeclineBtn;
