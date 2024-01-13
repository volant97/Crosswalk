import NavBar from '@/components/common/ui/NavBar';
import FetchUserProfile from '@/components/main/FetchUserProfile';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoChevronBackOutline } from 'react-icons/io5';

function ProfleDetailPage() {
  return (
    <div className="relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black ">
      <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-1">
        <Link href="/main" className="absolute left-0">
          <IoChevronBackOutline size="21" />
        </Link>
        <div className="!font-virgil my-[15px]">CrossWalk</div>
        <div className="absolute right-0 cursor-pointer">
          <Link href="/notification">
            <HiOutlineBell size={25} />
          </Link>
        </div>
      </header>
      <NavBar />
      <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">
        <FetchUserProfile />
      </div>
    </div>
  );
}

export default ProfleDetailPage;
