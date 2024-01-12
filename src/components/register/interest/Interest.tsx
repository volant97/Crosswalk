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
    if (activeStates.length < 1) {
      openModal('관심사를 선택해주세요!');
      return;
    }

    setRegisterData((prevValue) => ({
      ...prevValue,
      interest: activeStates
    }));

    router.push('#imgUpload');
  };
  console.log(activeStates);
  return (
    <>
      <div id="interest" className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold text-black">
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
                  isSelected ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
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
      </div>
      <Button
        className={`w-full font-semibold rounded-3xl cursor-pointer mb-10 ${
          activeStates.length === maxSelectedInterests ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        onClick={handleNextBtn}
      >
        NEXT ({activeStates.length}/{maxSelectedInterests})
      </Button>
      {AlertModal()}
    </>
  );
}

export default Interest;
