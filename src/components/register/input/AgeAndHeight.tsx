'use client';

import { registerState } from '@/recoil/register';
import { Button, Modal } from '@nextui-org/react';
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

    if (!age || !height) {
      openModal('나이와 키를 입력해주세요!');
      return;
    }

    setRegister((prevValue) => ({
      ...prevValue,
      age: Number(age),
      height: Number(height)
    }));

    router.push('#interest');
  };

  return (
    <form onSubmit={handleNameForm} id="age">
      <div className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className="text-[1.375rem] font-semibold">
          나이와 키를
          <br />
          입력해주세요.
        </h1>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm">나이</p>
            <input
              className="w-full py-3 text-center rounded-full cursor-pointer border appearance-none  focus-visible:border  focus-visible:border-black"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="27"
            />
          </div>
          <div>
            <p className="text-sm">키</p>
            <input
              className="w-full py-3 text-center rounded-full cursor-pointer border appearance-none focus-visible:border  focus-visible:border-black"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="165"
            />
          </div>
        </div>
      </div>
      <Button
        className={`w-full rounded-3xl cursor-pointer mb-10 ${age && height ? 'bg-customGreen' : 'bg-customYellow'}`}
        type="submit"
      >
        NEXT
      </Button>
    </form>
  );
}

export default AgeAndHeight;
