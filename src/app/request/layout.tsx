import NavBar from '@/components/common/ui/NavBar';
import NotiBell from '@/components/common/ui/NotiBell';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoIosArrowRoundBack } from 'react-icons/io';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden border-2 border-red-800">
      <div className="relative w-screen min-w-[22.5rem] max-w-[500px] px-8 h-screen border-solid border-1 border-black ">
        <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-between mb-1">
          <div className="flex-0 cursor-pointer">
            <Link href="/main">
              <IoIosArrowRoundBack size={25} />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center !font-virgil my-[15px]">CrossWalk</div>

          <div className="ml-auto">
            <NotiBell />
          </div>
        </header>
        <NavBar />
        <main className="h-[calc(85dvh)] overflow-y-auto scrollbar-hide border-2 border-blue-800">{children}</main>
      </div>
    </div>
  );
}

export default layout;

// main 태그에 추가?
// overflow-hidden overflow-y-auto scrollbar-hide
// min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]
// className="flex flex-col gap-[0.75rem] w-full h-full border-2 border-red-800"

// 높이 반응형 필요
