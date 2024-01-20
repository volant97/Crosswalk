'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

function Welcome() {
  const router = useRouter();
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center  gap-[32px] w-[300px] h-[170px]">
        <Image src="/assets/welcome/welcome_icon.png" width={80} height={80} alt="welcome" />
        <div className="flex flex-col w-full text-center items-center justify-center gap-[12px]">
          <h1 className="text-[30px] font-semibold leading-[30px] w-full">환영합니다!</h1>
          <h4 className="text-[16px] font-medium leading-[16px] w-full">crosswalk에서 새로운 인연을 만나보세요.</h4>
        </div>
      </div>
      <Button
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold bg-customGreen3 text-white rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10`}
        type="submit"
        onClick={() => router.push('/main')}
      >
        시작하기
      </Button>
    </Fragment>
  );
}

export default Welcome;
