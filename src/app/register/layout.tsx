import Indicator from '@/components/register/IndicatorScroll';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function Registerlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative max-w-96 px-8 ">
        <header className="font-virgil max-w-80 w-full h-16 flex fixed top-0 items-center justify-center mb-8">
          <Link href="/" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil">CrossWalk</div>
          <Indicator />
        </header>
        <div className="min-h-[calc(100dvh-12rem)]">{children}</div>
        <footer className="py-10 ">
          <Button className="w-full bg-customYellow rounded-3xl">NEXT</Button>
        </footer>
      </div>
    </>
  );
}
