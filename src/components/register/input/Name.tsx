'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Gender from './Gender';
import useAlertModal from '@/components/common/modal/AlertModal';

function Name() {
  const [register, setRegister] = useRecoilState(registerState);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !gender) {
      openModal('정보를 입력해주세요!');
      return;
    }

    setRegister((prevValue) => ({
      ...prevValue,
      name,
      gender
    }));

    router.push('#mbti');
  };

  return (
    <form className="min-h-[calc(100dvh-12rem)] " onSubmit={handleSubmit} id="name">
      <div className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <div>
          <h1 className=" text-[1.375rem] font-semibold text-black">
            이름과 성별을
            <br />
            입력해주세요.
          </h1>
          <p className=" text-sm">사용자의 실명을 입력해주세요.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="inputName" className="text-gray-AAA">
            이름
          </label>
          <input
            className="h-[50px] py-[8px] px-[20px] rounded-full cursor-pointer border border-gray-DDD"
            id="inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>
        {/* <Gender /> */}
        <div className="flex flex-col gap-1 justify-center">
          <span className="text-gray-AAA">이름</span>
          <div className="flex gap-2">
            <Button
              type="button"
              className={`w-[48%] py-2 px-6 bg-white rounded-full cursor-pointer border ${
                gender === 'M' ? 'font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
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
                gender === 'F' ? 'font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
              }`}
              onClick={() => {
                setGender('F');
              }}
            >
              여자
            </Button>
          </div>
        </div>
      </div>

      <Button
        className={`w-full font-semibold rounded-3xl text-black cursor-pointer mb-10 ${
          name && gender ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        type="submit"
      >
        NEXT
      </Button>
      {AlertModal()}
    </form>
  );
}

export default Name;
