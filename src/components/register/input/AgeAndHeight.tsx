'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function AgeAndHeight() {
  const [register, setRegister] = useRecoilState(userState);
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!age || !height) {
      openModal('나이와 키를 입력해주세요!');
      return;
    }

    // any타입
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        age: Number(age),
        height: Number(height)
      }
    }));
    console.log('!!!!!AgeAndHeight', register);
    router.push('#interest');
  };

  return (
    <form
      onSubmit={handleNameForm}
      id="age"
      className="flex flex-col items-center min-h-[calc(100dvh-2rem)]  h-[720px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative "
    >
      <div className="flex flex-col w-[300px] h-[278px]">
        <h1 className="text-[22px] font-semibold text-black mb-[50px] mt-[70px]">
          나이와 키를
          <br />
          입력해주세요.
        </h1>
        <div className="flex flex-col gap-[20px]">
          <div>
            <p className="text-[16px] text-gray-AAA">나이</p>
            <input
              className="w-[300px] h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border border-gray-DDD text-black appearance-none focus-visible:border  focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="27"
            />
          </div>
          <div>
            <p className="text-[16px] text-gray-AAA">키</p>
            <input
              className="w-[300px] h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border border-gray-DDD text-black appearance-none focus-visible:border focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="165"
            />
          </div>
        </div>
      </div>
      <Button
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          age && height ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        type="submit"
      >
        다음 단계
      </Button>
      {AlertModal()}
    </form>
  );
}

export default AgeAndHeight;
