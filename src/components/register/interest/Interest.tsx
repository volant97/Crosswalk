'use client';
import React, { useState } from 'react';
import interestData from '../../../data/interestData.json';

function Interest() {
  const { interests } = interestData;
  const [activeStates, setActiveStates] = useState<Array<boolean>>(Array(interests.length).fill(false));
  const maxSelectedInterests = 3; // 최대 선택 가능한 관심사 개수

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

      return newStates;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">관심사를</h1>
      <h1 className="text-3xl font-bold mb-8">선택해주세요.</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {interests.map((item, index) => (
          <div
            key={item.id}
            onClick={() => {
              handleInterestClick(index);
            }}
            className={`px-6 py-3 rounded-full cursor-pointer border ${
              activeStates[index] ? 'border-black text-black' : 'border-slate-300 text-slate-300'
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Interest;
