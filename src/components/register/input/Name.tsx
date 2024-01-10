'use client';

import { registerState } from '@/recoil/register';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Name() {
  const [register, setRegister] = useRecoilState(registerState);
  const [name, setName] = useState('');

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({
      ...register,
      name
    });
  };

  return (
    <form className="w-[300px] border-2 border-indigo-600" onSubmit={handleNameForm}>
      <div className="h-[186px] flex flex-col justify-between">
        <div>
          <h1 className="text-left text-[22px] font-[600] leading-[30.8px]">
            이름을
            <br />
            입력해주세요.
          </h1>
          <p className="text-left text-[14px] font-[400] leading-[19.6px]">사용자의 실명을 입력해주세요.</p>
        </div>
        <input
          className="h-[50px] py-[8px] px-[20px] rounded-full cursor-pointer border"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
        />
      </div>
      <button className="cursor-pointer" type="submit">
        NEXT
      </button>
    </form>
  );
}

export default Name;
