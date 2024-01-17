import Indicator from '@/components/register/IndicatorScroll';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function Registerlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-[100dvw] h-[100dvh] overflow-hidden">
      <div className=" flex flex-col items-center min-w-[360px] max-w-[430px] border-1 border-black">
        <header className="flex font-virgil w-[100%] h-16 flex sticky bg-white top-0 items-center justify-between mb-1">
          <div className="flex-1 flex items-center justify-center !font-virgil my-[15px]">CrossWalk</div>
        </header>

        <div className="min-h-[calc(100dvh-12rem)] overflow-y-hidden max-h-[calc(100dvh-7rem)]">{children}</div>
      </div>
    </div>
  );
}
