import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function MyProfileIcon({ pathname, active }: { pathname: string; active: string }) {
  return (
    <div
      className={` flex justify-center  items-center w-[25%]  ${
        pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
      }`}
    >
      <Link className="flex items-center gap-[4px] h-full text-[14px] font-semibold leading-[14px] " href="/my-profile">
        {pathname.startsWith('/my-profile') ? (
          <div className="w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
            <Image
              src="/assets/figmaImg/activeUserCircle2.png"
              className="w-[1.9rem] h-[1.9rem]  mr-[0.38rem]"
              width={100}
              height={100}
              alt="마이페이지 이미지"
            />
            <h1>프로필</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <Image
              src="/assets/figmaImg/userCircle2.png"
              className="w-[1.9rem] h-[1.9rem]"
              width={100}
              height={100}
              alt="마이페이지 이미지"
            />
          </div>
        )}
      </Link>
    </div>
  );
}

export default MyProfileIcon;
