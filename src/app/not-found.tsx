import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

function notFound() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-screen w-full max-w-[430px] min-w-[360px] border-x overflow-y-auto overflow-x-hidden scrollbar-hide px-8">
        <div className="relative flex flex-col justify-center items-center h-screen">
          <p className="text-[32px] font-bold">oops!</p>
          <p className="text-[92px] font-bold leading-[1]">404</p>
          <p className="text-[20px] text-gray-AAA">잘못된 접근입니다.</p>
          <Link href={'/'} className="absolute bottom-8 h-[50px] w-full">
            <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
              <p className="flex justify-center items-center  text-white text-[18px] leading-[20px] font-semibold ">
                처음으로
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default notFound;
