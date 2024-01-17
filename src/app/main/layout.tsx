import NavBar from '@/components/common/ui/NavBar';
import NotiBell from '@/components/common/ui/NotiBell';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoChevronBackOutline } from 'react-icons/io5';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden border-2 border-red-800">
      <div className="relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black ">
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
        <div className="min-h-[calc(100dvh-12rem)] overflow-y-hidden overflow-x-hidden max-h-[calc(100dvh-7rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;

// children 감싸는 부분에 추가?
// <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">
