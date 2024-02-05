import React from 'react';
import NotiBell from '../common/ui/NotiBell';
import Link from 'next/link';
import Image from 'next/image';
import GoToBackBtn from './GoToBackBtn';
import serviceImg from '@assets/figmaImg/contact.png';
import { IoMdSettings } from 'react-icons/io';

interface PageProps {
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
  noBackMain?: boolean;
  cs?: boolean;
}

function Header({ noBack, noNavBar, noNotiBell, noBackMain, cs }: PageProps) {
  return (
    <div className="sticky top-0 bg-white z-50 ">
      <div className="relative flex font-virgil h-[9dvh] items-center justify-center border-b-[1px] border-[#E9EAEB] ">
        {!noBack && !noBackMain && (
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
        {!noBack && noBackMain && <GoToBackBtn />}
        <Link href={'/main'}>
          <div className="flex items-center justify-center w-full h-full pt-[5px] text-[3dvh] font-virgil font-[500]">
            Crosswalk
          </div>
        </Link>
        {!noNotiBell && (
          <div className="absolute right-[25px]">
            <NotiBell />
          </div>
        )}
        {cs && (
          <Link
            href={'/customer-service/contact'}
            className="absolute flex items-center justify-end right-[25px] w-7 h-7 pr-1"
          >
            <Image className="w-5 h-5" src={serviceImg} width={20} height={20} alt="문의 이미지" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
