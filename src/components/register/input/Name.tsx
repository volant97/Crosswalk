'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Name() {
  const [register, setRegister] = useRecoilState(registerState);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({
      ...register,
      name
    });
    router.push('#gender');
  };

  return (
    <form className="min-h-[calc(100dvh-12rem)] " onSubmit={handleNameForm} id="name">
      <div className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <div>
          <h1 className=" text-[1.375rem] font-semibold">
            이름을
            <br />
            입력해주세요.
          </h1>
          <p className=" text-sm">사용자의 실명을 입력해주세요.</p>
        </div>
        <input
          className="h-[50px] py-[8px] px-[20px] rounded-full cursor-pointer border"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
        />
      </div>
      {/* <button className="cursor-pointer" type="submit">
        NEXT
      </button> */}
      <Button className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10" type="submit">
        NEXT
      </Button>
    </form>
  );
}

export default Name;
