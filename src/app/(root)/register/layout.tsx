import React from 'react';
import Link from 'next/link';
import Indicator from '@/components/register/IndicatorScroll';

function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[100dvh] w-full max-w-[430px] min-w-[360px] border-x !overflow-y-hidden overflow-x-hidden scrollbar-hide">
        <header className="relative flex flex-col justify-center font-virgil h-[9dvh] top-0 bg-white items-center border-[#E9EAEB] ">
          <Link href={'/'}>
            <div className="flex items-center justify-center w-full h-full pt-[5px] text-[3dvh] font-virgil font-[500]">
              Crosswalk
            </div>
          </Link>
          <Indicator />
        </header>
        <main className="relative flex flex-col items-center h-[calc(100dvh-9dvh)] px-[30px] py-[40px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default RegisterLayout;
