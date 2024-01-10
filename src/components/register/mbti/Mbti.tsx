'use client';

import React, { useState } from 'react';
import mbtiData from '../../../data/mbti_data.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

function Mbti() {
  const { mbti } = mbtiData;
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const [selectedMbti, setSelectedMbti] = useState<string | null>('');

  const router = useRouter();

  const handleMbtiClick = (item: string) => {
    if (selectedMbti === item) {
      setSelectedMbti('');
    } else setSelectedMbti(item);
  };
  const handleNextBtn = () => {
    setRegisterData({
      ...registerData,
      mbti: selectedMbti
    });
    if (selectedMbti) {
      router.push('#age');
    } else alert('MBTI를 선택해주세요!');
  };

  return (
    <>
      <div id="mbti" className="min-h-[calc(100dvh-12rem)] flex flex-wrap flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold ">
          MBTI를
          <br />
          선택해주세요.
        </h1>
        <div className="grid grid-cols-4 gap-3 w-full flex-wrap ">
          {mbti.map((item, index) => (
            <div
              onClick={() => {
                handleMbtiClick(item);
              }}
              className={`flex justify-center border-solid border-slate-300 border-1 w-[50px] py-[5px] px-[30px] rounded-[50px] text-slate-300 cursor-pointer`}
              key={index}
              style={{
                color: selectedMbti === item ? 'black' : '',
                border: selectedMbti === item ? '1px solid black' : ''
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={`w-full rounded-3xl cursor-pointer mb-10 ${selectedMbti ? 'bg-customGreen' : 'bg-customYellow'}`}
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
    </>
  );
}
export default Mbti;
