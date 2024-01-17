'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const active = ' font-bold border-b-3 border-solid border-black';

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="h-[2.5rem] bg-white shadow-lg grid grid-cols-3 items-center w-full">
      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center  ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[0.25rem]" href="/request">
          {pathname.startsWith('/request') ? (
            <>
              <Image
                src="/assets/figmaImg/activeRequest.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          ) : (
            <>
              <Image
                src="/assets/figmaImg/request.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          )}
          Request
        </Link>
      </div>

      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center ${
          pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[0.25rem]" href="/chat-list">
          {pathname.startsWith('/chat-list') ? (
            <>
              <Image
                src="/assets/figmaImg/activeChat.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          ) : (
            <>
              <Image
                src="/assets/figmaImg/chat.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          )}
          Chat
        </Link>
      </div>

      <div
        className={`mt-[12px] w-[6.5rem] pb-[3px] flex justify-center ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[0.25rem]" href="/my-profile">
          {pathname.startsWith('/my-profile') ? (
            <>
              <Image
                src="/assets/figmaImg/activeUserCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          ) : (
            <>
              <Image
                src="/assets/figmaImg/userCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </>
          )}
          My
        </Link>
      </div>
    </nav>

    // <nav className="ml-[-33px]  flex gap-[30px] items-center border-t-1 border-solid boredr-black h-[2.2rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem] ">
  );
}

export default NavBar;
