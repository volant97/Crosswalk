import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function HomeIcon({ pathname, active }: { pathname: string; active: string }) {
  return (
    <div
      className={` flex justify-center items-center w-[25%] ${
        pathname.startsWith('/main') ? `${active}` : 'text-slate-300'
      }`}
    >
      <Link className="flex items-center justify-center text-[14px] font-semibold leading-[14px]" href="/main">
        {pathname.startsWith('/main') ? (
          <div className=" w-[3.93rem] h-8 flex items-center justify-center">
            <Image
              src="/assets/figmaImg/activeHome2.png"
              className="w-[1.9rem] h-[1.9rem] mr-[0.38rem]"
              width={100}
              height={100}
              alt="홈 이미지"
            />
            <h1>홈</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <Image
              src="/assets/figmaImg/home2.png"
              className="w-[1.9rem] h-[1.9rem]"
              width={100}
              height={100}
              alt="홈 이미지"
            />
          </div>
        )}
      </Link>
    </div>
  );
}

export default HomeIcon;
