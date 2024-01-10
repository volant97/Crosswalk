'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Gender from './Gender';

function Name() {
  const [register, setRegister] = useRecoilState(registerState);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');
  const router = useRouter();

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({
      ...register,
      name,
      gender
    });
    if (name && gender) {
      router.push('#mbti');
    } else {
      alert('정보를 입력해주세요!');
    }
  };

  return (
    <form className="min-h-[calc(100dvh-12rem)] " onSubmit={handleNameForm} id="name">
      <div className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <div>
          <h1 className=" text-[1.375rem] font-semibold">
            이름과 성별을
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
        {/* <Gender /> */}
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            className={`w-[48%] py-2 px-6 bg-white rounded-full cursor-pointer border ${
              gender === 'M' ? 'font-semibold border-black text-black' : 'border-slate-300 text-slate-300'
            }`}
            onClick={() => {
              setGender('M');
            }}
          >
            남자
          </Button>
          <Button
            type="button"
            className={`w-[48%] py-2 px-6 bg-white rounded-full cursor-pointer border ${
              gender === 'F' ? 'font-semibold border-black text-black' : 'border-slate-300 text-slate-300'
            }`}
            onClick={() => {
              setGender('F');
            }}
          >
            여자
          </Button>
        </div>
      </div>

      {/* <button className="cursor-pointer" type="submit">
        NEXT
      </button> */}
      <Button
        className={`w-full rounded-3xl cursor-pointer mb-10 ${name && gender ? 'bg-customGreen' : 'bg-customYellow'}`}
        type="submit"
      >
        NEXT
      </Button>
    </form>
  );
}

export default Name;
