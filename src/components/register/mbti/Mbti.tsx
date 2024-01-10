'use client';

import React, { useState } from 'react';
import mbtiData from '../../../data/mbti_data.json';

type Mbti = {
  id: number;
  name: string;
};

function Mbti() {
  const { mbti } = mbtiData;
  const [selectedMbti, setSelectedMbti] = useState<number | null>(null);

  const handleMbtiClick = (index: number) => {
    if (selectedMbti === index) {
      // 이미 선택된 것을 다시 클릭한 경우
      setSelectedMbti(null);
    } else {
      // 이전 선택된 것의 선택 해제
      setSelectedMbti(index);
    }
  };

  return (
    <div>
      <h1 className="text-3xl bold ">MBTI를</h1> <h1 className="text-3xl bold ">선택해주세요.</h1>
      <div className="grid grid-cols-4 gap-x-[70px] gap-y-[20px] w-[200px] flex-wrap mt-[50px] mr-auto ml-auto ">
        {mbti.map((item, index) => (
          <div
            onClick={() => {
              handleMbtiClick(index);
            }}
            className={`flex justify-center border-solid border-slate-300 border-1 w-[50px] py-[5px] px-[30px] rounded-[50px] text-slate-300 cursor-pointer ${
              selectedMbti === index ? 'active' : ''
            }`}
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .active {
          color: black;
          border: 2px solid black;
        }
      `}</style>
    </div>
  );
}

export default Mbti;
