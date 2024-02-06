import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function RequestIcon({ pathname, active }: { pathname: string; active: string }) {
  return (
    <div
      className={` flex justify-center items-center w-[25%]  ${
        pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
      }`}
    >
      <Link
        className="flex items-center justify-center gap-[4px] h-full text-[14px] font-semibold leading-[14px]"
        href="/request"
      >
        {pathname.startsWith('/request') ? (
          <div className=" w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
            <Image
              src="/assets/figmaImg/activeRequest2.png"
              className="w-[1.9rem] h-[1.9rem] mr-[0.38rem]"
              width={100}
              height={100}
              alt="받은 요청함 이미지"
            />
            <h1>요청함</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <Image
              src="/assets/figmaImg/request2.png"
              className="w-[1.9rem] h-[1.9rem]"
              width={100}
              height={100}
              alt="받은 요청함 이미지"
            />
          </div>
        )}
      </Link>
    </div>
  );
}

export default RequestIcon;
