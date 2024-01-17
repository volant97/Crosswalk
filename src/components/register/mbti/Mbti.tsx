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

    // any타입
    setRegisterData((prevValue: any) => ({
      ...prevValue,
      mbti: selectedMbti
    }));

    router.push('#age');
  };

  return (
    <>
      <div
        id="mbti"
        className=" flex flex-col items-center border-1 min-h-[calc(100dvh-2rem)] overflow-y-hidden h-[720px] max-h-[calc(100dvh-7rem)  pl-[30px] pr-[30px] pt-[20px] relative"
      >
        <div className="flex flex-col w-[300px] h-[274px]  ">
          <h1 className="text-[1.375rem] font-semibold text-black mb-[50px]">
            MBTI를
            <br />
            선택해주세요.
          </h1>
          <div className="grid grid-cols-4 w-full gap-[6px] flex-wrap ">
            {mbti.map((item, index) => (
              <div
                onClick={() => {
                  handleMbtiClick(item);
                }}
                className={`w-[70px] h-[40px] py-[5px] px-[30px] mb-[6px]  flex justify-center items-center border-solid  border-1  rounded-[50px] cursor-pointer ${
                  selectedMbti === item ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
                }`}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>{' '}
        <Button
          className={`absolute top-[80%] w-[300px] h-[50px] font-semibold bg-customYellow text-black rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
            selectedMbti ? 'bg-customGreen' : 'bg-customYellow'
          }`}
          onClick={handleNextBtn}
        >
          NEXT
        </Button>
        {AlertModal()}
      </div>
    </>
  );
}
export default Mbti;
