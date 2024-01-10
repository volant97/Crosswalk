'use client';

import React, { useState } from 'react';
import mbtiData from '../../../data/mbti_data.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';

type Mbti = {
  id: number;
  name: string;
};

function Mbti() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const { mbti } = mbtiData;
  const [selectedMbti, setSelectedMbti] = useState<number | null>(null);

  const handleMbtiClick = (index: number) => {
    const selectedMbtiName = mbti[index].name;
    if (selectedMbti === index) {
      setSelectedMbti(index);
    } else {
      setSelectedMbti(index);
      setRegisterData((prevData) => ({
        ...prevData,
        mbti: selectedMbtiName
      }));
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
          border: 1px solid black;
        }
      `}</style>
      저장된 MBTI : {registerData.mbti}
    </div>
  );
}
export default Mbti;
