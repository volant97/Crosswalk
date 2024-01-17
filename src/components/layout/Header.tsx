import React, { PropsWithChildren } from 'react';
import NotiBell from '../common/ui/NotiBell';
import NavBar from '../common/ui/NavBar';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

interface PageProps {
  noBack?: boolean;
}

function Header({ noBack }: PageProps) {
  return (
    <>
      <div className="relative flex font-virgil h-16 sticky top-0 bg-white items-center mb-1 justify-center">
        {!noBack && (
          <Link href="/main">
            <IoIosArrowRoundBack size={25} />
          </Link>
        )}
        <div>CrossWalk</div>

        <div className="absolute right-4">
          <NotiBell />
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default Header;
