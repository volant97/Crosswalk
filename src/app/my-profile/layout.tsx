import NavBar from '@/components/common/ui/NavBar';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoIosArrowRoundBack } from 'react-icons/io';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden border-2 border-red-800">
      <div className="relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black ">
        <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-1">
          <div className="!font-virgil my-[15px]">CrossWalk</div>
          <div className="absolute left-0 cursor-pointer">
            <Link href="/main">
              <IoIosArrowRoundBack size={25} />
            </Link>
          </div>
          <div className="absolute right-0 cursor-pointer">
            <Link href="/notification">
              <HiOutlineBell size={25} />
            </Link>
          </div>
        </header>
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default layout;

// children 감싸는 부분에 추가?
// <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">
