'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const active = ' font-bold border-b-3 border-solid border-black ';

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="ml-[-33px]  flex gap-[30px] items-center border-t-1 border-solid boredr-black h-[2.2rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem] ">
      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300 pb-[3px]'
        }`}
      >
        <Link className="" href="/request">
          Request
        </Link>
      </div>

      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center ${
          pathname.startsWith('/message') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link href="/message">Chat</Link>
      </div>

      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link href="/my-profile">My</Link>
      </div>
    </nav>
  );
}

export default NavBar;
