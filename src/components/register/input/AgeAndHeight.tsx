'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function AgeAndHeight() {
  const [register, setRegister] = useRecoilState(registerState);
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const router = useRouter();

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({
      ...register,
      age: Number(age),
      height: Number(height)
    });

    router.push('#interest');
  };

  return (
    <form className="  " onSubmit={handleNameForm} id="age">
      <div className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold">
          나이와 키를
          <br />
          입력해주세요.
        </h1>
        <div>
          <p className="text-sm">나이</p>
          <input
            className="h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="27"
          />
          <p className="text-sm">키</p>
          <input
            className="h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="165"
          />
        </div>
      </div>
      <Button className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10" type="submit">
        NEXT
      </Button>
    </form>
  );
}

export default AgeAndHeight;
