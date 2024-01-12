'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="ml-[-33px]  flex gap-[80px]  items-center border-t-1 border-solid boredr-black h-[2.5rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem]">
      <Link className={`ml-[44px] ${pathname.startsWith('/request') ? 'font-bold' : 'text-slate-300'}`} href="/request">
        Request
      </Link>
      <Link
        className={`ml-[-15px] ${pathname.startsWith('/message') ? 'font-bold' : 'text-slate-300'}`}
        href="/message"
      >
        Chat
      </Link>
      <Link className={`${pathname.startsWith('/my-profile') ? 'font-bold' : 'text-slate-300'}`} href="/my-profile">
        My
      </Link>
    </nav>
  );
}

export default NavBar;
