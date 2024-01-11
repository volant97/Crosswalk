'use client';
import React, { useState } from 'react';
import interestData from '../../../data/interestData.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useAlertModal from '@/components/common/modal/AlertModal';

function Interest() {
  const { interests } = interestData;
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const [activeStates, setActiveStates] = useState<string[]>([]);
  const maxSelectedInterests = 3; // 최대 선택 가능한 관심사 개수

  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const handleInterestClick = (interest: string) => {
    if (activeStates.includes(interest)) {
      const updatedActiveStates = activeStates.filter((selectedInterest) => selectedInterest !== interest);
      setActiveStates(updatedActiveStates);
    } else if (activeStates.length >= maxSelectedInterests) {
      openModal(`관심사는 최대 ${maxSelectedInterests}개까지 선택 가능합니다.`);
    } else {
      setActiveStates([...activeStates, interest]);
    }
  };

  const handleNextBtn = () => {
    setRegisterData({
      ...registerData,
      interest: activeStates
    });
    if (activeStates.length > 0) {
      router.push('#imgUpload');
    } else openModal('관심사를 선택해주세요!');
  };
  console.log(activeStates);
  return (
    <>
      <div id="interest" className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold">
          관심사를
          <br />
          선택해주세요.
        </h1>
        <ul className="flex flex-wrap gap-3 justify-center">
          {interests.map((interest) => {
            const isSelected = activeStates.includes(interest.name);
            return (
              <li
                key={interest.id}
                className={`py-2 px-6 rounded-full cursor-pointer border ${
                  isSelected ? 'border-black text-black' : 'border-slate-300 text-slate-300'
                }`}
                onClick={() => {
                  handleInterestClick(interest.name);
                }}
              >
                {interest.name}
              </li>
            );
          })}
        </ul>
        useState에 있는 관심사 : {activeStates.join(', ')}
        <br />
        recoil에 있는 관심사 : {registerData.interest?.join(', ')}
      </div>
      <Button
        className={`w-full rounded-3xl cursor-pointer mb-10 ${
          activeStates.length > 0 ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
      {AlertModal()}
    </>
  );
}

export default Interest;
