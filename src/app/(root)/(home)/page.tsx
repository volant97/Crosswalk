import Page from '@/components/layout/Page';
import React from 'react';
import StartOrRegister from '@/components/home/StartOrRegister';
import Image from 'next/image';
import tutorial_avatar_all from '@assets/tutorial/tutorial_avatar_all.png';

export default function HomePage() {
  return (
    <Page noHeader>
      <div className="flex flex-col items-center pt-[5rem] pb-[3rem]">
        <header className="flex flex-col items-center">
          <h1 className="font-virgil text-[2rem]">Crosswalk</h1>
          <h2 className="text-[1.125rem]">인생의 소울메이트를 만나보세요!</h2>
        </header>

        {/* <div className="relative flex justify-center items-center w-[37.5rem] h-[16.875rem]"> */}
        <div className="relative w-full max-h-[20rem] h-[40vh]">
          <Image src={tutorial_avatar_all} alt="tutorial_avatar1" fill className="object-cover" />
        </div>

        <div className="flex justify-center items-center w-[18.75rem] h-[3.125rem]">
          <StartOrRegister />
        </div>
      </div>
    </Page>
  );
}
