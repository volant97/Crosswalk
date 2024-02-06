'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

function Welcome() {
  const router = useRouter();

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-[27.7778dvh] flex flex-col items-center justify-center  gap-[32px] w-full h-[170px]">
        <Image src="/assets/welcome/welcome_icon.png" width={80} height={80} alt="welcome" />
        <div className="flex flex-col w-full text-center items-center justify-center gap-[12px]">
          <h1 className="text-[30px] font-semibold leading-[30px] w-full">환영합니다!</h1>
          <h4 className="text-[16px] font-medium leading-[16px] w-full">crosswalk에서 새로운 인연을 만나보세요.</h4>
        </div>
      </div>
      <Button
        className={`absolute bottom-0 w-full h-[50px]  font-semibold bg-customGreen3 text-white rounded-3xl cursor-pointer text-[18px] `}
        type="submit"
        onClick={() => router.push('/main')}
      >
        시작하기
      </Button>
    </div>
  );
}

export default Welcome;
