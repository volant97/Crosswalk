'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const active = ' font-bold border-b-3 border-solid border-black ';

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="h-[2.5rem] bg-white shadow-lg border-t grid grid-cols-3 items-center w-full">
      <div className={`flex justify-center ${pathname.startsWith('/request') ? `${active}` : 'text-slate-300'}`}>
        <Link className="" href="/request">
          Request
        </Link>
      </div>

      <div className={`flex justify-center ${pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'}`}>
        <Link href="/chat-list">Chat</Link>
      </div>

      <div className={`flex justify-center ${pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'}`}>
        <Link href="/my-profile">My</Link>
      </div>
    </nav>
  );
}

export default NavBar;
