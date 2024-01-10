'use client';

import { registerState } from '@/recoil/register';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Gender() {
  const [register, setRegister] = useRecoilState(registerState);
  const [gender, setGender] = useState<string>('');

  const handleMBtn = () => {
    setGender('M');
  };

  const handleFBtn = () => {
    setGender('F');
  };

  const handleNextBtn = () => {
    setRegister({
      ...register,
      gender
    });
  };

  return (
    <div className="w-[300px] border-2 border-indigo-600">
      <button onClick={handleMBtn}>남자</button>
      <button onClick={handleFBtn}>여자</button>
      <button onClick={handleNextBtn}>NEXT</button>
      {/* test */}
      <div>성별 : {gender}</div>
    </div>
  );
}

export default Gender;
