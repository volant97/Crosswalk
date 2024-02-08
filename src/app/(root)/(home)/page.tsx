import React from 'react';
import StartOrRegister from '@/components/home/StartOrRegister';
import Image from 'next/image';
import login_main_img from '@assets/login/login_main_img.png';

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-evenly h-[100dvh]">
      <header className="flex flex-col gap-[14px] items-center text-black">
        <h1 className="w-[140px] h-[32px] text-[28px] font-virgil font-[600] leading-normal">Crosswalk</h1>
        <h2 className="text-[18px] font-pretendard font-[400] leading-normal">인생의 소울메이트를 만나보세요!</h2>
      </header>
      <div className="relative w-[600px] h-[270px] max-h-[20rem]">
        <Image src={login_main_img} alt="tutorial_avatar1" width={600} height={270} className="object-cover" />
      </div>

      <div className="flex justify-center items-center w-[18.75rem] h-[3.125rem]">
        <StartOrRegister />
      </div>
      {/* update ver 표시 */}
      <p className="absolute text-[13px] text-gray-999 right-4 bottom-4">ver 1.9.1</p>
    </div>
  );
}
