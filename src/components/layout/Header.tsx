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
    <>
      <div className="relative flex font-virgil h-[64px] sticky top-0 bg-white items-center mb-1 justify-center border-b-[1px] z-99">
        {!noBack && (
          <Link href="/main" className="absolute left-4">
            <Image
              src="/assets/figmaImg/arrow.png"
              alt="뒤로가기 화살표"
              width={24}
              height={24}
              className="absolute left-0 cursor-pointer relative"
            />
          </Link>
        )}
        <div className="text-[19px]">CrossWalk</div>
        {!noNotiBell && (
          <div className="absolute right-4">
            <NotiBell />
          </div>
        )}
      </div>
      {!noNavBar && <NavBar />}
    </>
  );
}

export default Header;
