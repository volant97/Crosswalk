import Indicator from '@/components/register/IndicatorScroll';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function Registerlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative max-w-96 px-5 ">
        <header className="font-virgil w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-8">
          <Link href="/" className="absolute left-0">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil">CrossWalk</div>
          <Indicator />
        </header>
        <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">{children}</div>
      </div>
    </>
  );
}
