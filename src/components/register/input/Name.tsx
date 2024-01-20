'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Gender from './Gender';
import useAlertModal from '@/components/common/modal/AlertModal';
import { userState } from '@/recoil/user';

function Name() {
  const [register, setRegister] = useRecoilState(userState);
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

    // any타입
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        name,
        gender
      }
    }));
    console.log('!!!!!name', register);
    router.push('#mbti');
  };

  return (
    <form
      className=" flex flex-col items-center min-h-[calc(100dvh-2rem)]  h-[720px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative "
      onSubmit={handleSubmit}
      id="name"
    >
      <div className="flex flex-col w-[300px] h-[274px] gap-[20px]">
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold text-black mt-[70px]">
            이름과 성별을
            <br />
            입력해주세요.
          </h1>
          <p className=" text-sm mt-[5px] mb-[30px] text-gray-666">사용자의 실명을 입력해주세요.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="inputName" className="text-gray-AAA text-[16px]">
            이름
          </label>
          <input
            className="h-[50px] w-[300px] py-[8px] px-[20px] rounded-full cursor-pointer border border-gray-DDD focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
            id="inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>
        {/* <Gender /> */}
        <div className="flex flex-col gap-1 justify-center">
          <span className="text-gray-AAA text-[16px]">성별</span>
          <div className="flex gap-2">
            <Button
              type="button"
              className={`w-[146px] h-[46px] pl-[20px] pr-[20px] pt-[8px] pb-[8px] bg-white rounded-full cursor-pointer border ${
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
              className={`w-[146px] h-[46px] pl-[20px] pr-[20px] pt-[8px] pb-[8px] bg-white rounded-full cursor-pointer border ${
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
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          name && gender ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        type="submit"
      >
        다음 단계
      </Button>
      {AlertModal()}
    </form>
  );
}

export default Name;
