'use client';

import { registerState } from '@/recoil/register';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function AgeAndHeight() {
  const [register, setRegister] = useRecoilState(registerState);
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({
      ...register,
      age: Number(age),
      height: Number(height)
    });
  };

  return (
    <form className="w-[300px] border-2 border-indigo-600" onSubmit={handleNameForm}>
      <div className="h-[300px] flex flex-col justify-between">
        <h1 className="text-left text-[22px] font-[600] leading-[30.8px]">
          나이와 키를
          <br />
          입력해주세요.
        </h1>
        <div>
          <p className="text-left text-[14px] font-[400] leading-[19.6px]">나이</p>
          <input
            className="h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="27"
          />
          <p className="text-left text-[14px] font-[400] leading-[19.6px]">키</p>
          <input
            className="h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="165"
          />
        </div>
      </div>
      <button type="submit">NEXT</button>
    </form>
  );
}

export default AgeAndHeight;
