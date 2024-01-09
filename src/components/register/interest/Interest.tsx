'use client';
import React, { useState } from 'react';
import interestData from '../../../data/interestData.json';
type Interest = {
  id: number;
  name: string;
};
// ... (이전 코드)

function Interest() {
  const { interests } = interestData;
  const [activeStates, setActiveStates] = useState(Array(interests.length).fill(false));
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

      return newStates;
    });
  };

  return (
    <div>
      <h1 className="text-3xl bold ">관심사를</h1> <h1 className="text-3xl bold ">선택해주세요.</h1>
      <div className="grid grid-cols-4 gap-x-[70px] gap-y-[20px] w-[200px] flex-wrap mt-[50px] mr-auto ml-auto ">
        {interests.map((item, index) => (
          <div
            onClick={() => {
              handleInterestClick(index);
            }}
            className={`flex justify-center border-solid border-slate-300 border-1 w-[50px] py-[5px] px-[30px] rounded-[50px] text-slate-300 cursor-pointer ${
              activeStates[index] ? 'active' : ''
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
    </div>
  );
}

export default Interest;
