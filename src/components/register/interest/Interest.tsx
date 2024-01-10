'use client';
import React, { useState } from 'react';
import interestData from '../../../data/interestData.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

function Interest() {
  // interestData 는 json 형식
  // interests는 배열
  // activeStates는 배열 [true, false ...] index 0~11
  // Recoil state를 만들어서 넣어야 함, atom은 객체형태임을 유의
  const [registerData, setRegisterData] = useRecoilState(registerState);

  const { interests } = interestData;
  const [activeStates, setActiveStates] = useState<Array<boolean>>(Array(interests.length).fill(false));
  const maxSelectedInterests = 3; // 최대 선택 가능한 관심사 개수

  const router = useRouter();

  const handleInterestClick = (index: number) => {
    setActiveStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];

      // 선택된 관심사의 개수를 세기
      const selectedCount = newStates.filter((state) => state).length;

      // 선택된 관심사가 3개를 초과하는 경우 알림 표시
      if (selectedCount > maxSelectedInterests) {
        alert(`관심사는 최대 ${maxSelectedInterests}개까지 선택 가능합니다.`);
        return prevStates; // 이전 상태로 복원
      }

      // 선택된 관심사 정보 출력
      const selectedInterests = interests.filter((_, i) => newStates[i]).map((item) => item.name);
      console.log('선택된 관심사:', selectedInterests);

      // registerState의 interest 업데이트
      setRegisterData((prevInterest) => ({
        ...prevInterest,
        interest: selectedInterests
      }));

      return newStates;
    });
  };

  const handleNextBtn = () => {
    router.push('#imgUpload');
  };

  return (
    <>
      <div id="interest" className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold">
          관심사를
          <br />
          선택해주세요.
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mt-[50px] mr-auto ml-auto ">
          {interests.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                handleInterestClick(index);
              }}
              className={`flex flex-row justify-center px-6 py-3 rounded-full cursor-pointer max-w-[110px] py-[5px] px-[20px] border ${
                activeStates[index] ? 'border-black text-black' : 'border-slate-300 text-slate-300'
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        저장된 관심사 : {registerData.interest}
      </div>
      <Button className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10" onClick={handleNextBtn}>
        NEXT
      </Button>
    </>
  );
}

export default Interest;
