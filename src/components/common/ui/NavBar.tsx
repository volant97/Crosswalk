'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const active = ' font-bold border-b-3 border-solid border-black';

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="h-[7dvh] bg-white shadow-navBarShadow grid grid-cols-3 items-center w-full pl-[20px] pr-[20px] ">
      <div
        className={`w-[full] h-full flex justify-center items-center pb-[1px] ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center justify-center gap-[4px] h-full text-[14px]" href="/request">
          {pathname.startsWith('/request') ? (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeRequest.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/request.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
          Request
        </Link>
      </div>

      <div
        className={` w-[full] h-full flex justify-center  items-center ${
          pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] pb-[1px]" href="/chat-list">
          {pathname.startsWith('/chat-list') ? (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeChat.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/chat.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
          Chat
        </Link>
      </div>

      <div
        className={` w-[full] h-full flex justify-center  items-center ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] pb-[1px]" href="/my-profile">
          {pathname.startsWith('/my-profile') ? (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeUserCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/userCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
          My
        </Link>
      </div>
    </nav>

    // <nav className="ml-[-33px]  flex gap-[30px] items-center border-t-1 border-solid boredr-black h-[2.2rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem] ">
  );
}

export default NavBar;
