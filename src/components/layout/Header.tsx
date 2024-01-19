import React, { PropsWithChildren } from 'react';
import NotiBell from '../common/ui/NotiBell';
import NavBar from '../common/ui/NavBar';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
}

function Header({ noBack, noNavBar, noNotiBell }: PageProps) {
  return (
    <div className="sticky top-0  bg-white z-50">
      <div className="relative flex font-virgil h-[64px] items-center justify-center border-b-[1px] border-[#E9EAEB] ">
        {!noBack && (
          <Link href="/main" className="absolute left-4">
            <Image
              src="/assets/figmaImg/arrow.png"
              alt="뒤로가기 화살표"
              width={24}
              height={24}
              className="left-0 cursor-pointer"
            />
          </Link>
        )}
        <Link href={'/main'}>
          <div className="flex items-center justify-center w-full h-full pt-[5px] text-[19px] font-virgil font-[500]">
            Crosswalk
          </div>
        </Link>
        {!noNotiBell && (
          <div className="absolute right-4">
            <NotiBell />
          </div>
        )}
      </div>
      {!noNavBar && <NavBar />}
    </div>
  );
}

export default Header;
