// 'use client';
import { supabase } from '@/lib/supabase-config';
import React from 'react';

type Props = {
  listId: number;
};

/**수락 버튼 */
function AcceptBtn({ listId }: Props) {
  /**수락 버튼 클릭시 업데이트 */
  const handleAcceptBtn = async () => {
    await supabase.from('flirting_list').update({ status: 'ACCEPT' }).eq('id', listId).select();
  };

  return (
    <button className="bg-customGreen w-[3rem] h-[3rem] rounded-full" onClick={handleAcceptBtn}>
      수락
    </button>
  );
}

export default AcceptBtn;
