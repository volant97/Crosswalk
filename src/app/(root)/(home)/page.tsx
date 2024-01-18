import Page from '@/components/layout/Page';
import React from 'react';
import StartOrRegister from '@/components/home/StartOrRegister';
import Image from 'next/image';
import login_main_img from '@assets/login/login_main_img.png';

export default function HomePage() {
  return (
    <Page noHeader>
      <div className="flex flex-col items-center justify-evenly h-screen">
        <header className="flex flex-col gap-[14px] items-center text-black">
          <h1 className="w-[140px] h-[32px] text-[28px] font-virgil font-[600] leading-none">Crosswalk</h1>
          <h2 className="text-[18px] font-pretendard font-[400] leading-none">인생의 소울메이트를 만나보세요!</h2>
        </header>

        {/* <div className="relative flex justify-center items-center w-[37.5rem] h-[16.875rem]"> */}
        <div className="relative w-full max-h-[20rem] h-[40vh]">
          <Image src={login_main_img} alt="tutorial_avatar1" fill className="object-cover" />
        </div>

        <div className="flex justify-center items-center w-[18.75rem] h-[3.125rem]">
          <StartOrRegister />
        </div>
      </div>
    </Page>
  );
}
