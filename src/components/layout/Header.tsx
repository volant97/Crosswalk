import React, { PropsWithChildren } from 'react';
import NotiBell from '../common/ui/NotiBell';
import NavBar from '../common/ui/NavBar';
import Link from 'next/link';
import Image from 'next/image';
import GoToBackBtn from './GoToBackBtn';
import { IoMdSettings } from 'react-icons/io';
import { MdSupportAgent } from 'react-icons/md';

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
          <Link href={'/customer-service/contact'} className="absolute right-[25px]">
            <MdSupportAgent size={24} />
            {/* <IoMdSettings size={24} /> //추후에 설정페이지 만들면 적용 = 설정아이콘 */}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
