import React from 'react';

type Props = {
  cardId: number;
};

function RefuseBtn({ cardId }: Props) {
  return <button className="bg-customYellow w-[3rem] h-[3rem] rounded-full">거절</button>;
}

export default RefuseBtn;
