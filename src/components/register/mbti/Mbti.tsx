'use client';

import React, { useState } from 'react';
import mbti from '../../../data/mbti_data.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useAlertModal from '@/components/common/modal/AlertModal';

function Mbti() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const [selectedMbti, setSelectedMbti] = useState<string | null>('');

  const { openModal, AlertModal } = useAlertModal();
  const router = useRouter();

  const handleMbtiClick = (item: string) => {
    if (selectedMbti === item) setSelectedMbti('');
    else setSelectedMbti(item);
  };
  const handleNextBtn = () => {
    if (!selectedMbti) {
      openModal('MBTI를 선택해주세요!');
      return;
    }

    setRegisterData((prevValue) => ({
      ...prevValue,
      mbti: selectedMbti
    }));

    router.push('#age');
  };

  return (
    <>
      <div id="mbti" className="min-h-[calc(100dvh-12rem)] flex flex-wrap flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold text-black ">
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
              className={`w-[50px] py-[5px] px-[30px] flex justify-center border-solid  border-1  rounded-[50px] cursor-pointer ${
                selectedMbti === item ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
              }`}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={`w-full font-semibold rounded-3xl cursor-pointer mb-10 ${
          selectedMbti ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
      {AlertModal()}
    </>
  );
}
export default Mbti;
