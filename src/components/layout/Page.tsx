import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import NavBar from '../common/ui/NavBar';

interface PageProps {
  noHeader?: boolean;
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
}

function Page({ noHeader, noBack, noNavBar, noNotiBell, children }: PropsWithChildren<PageProps>) {
  return (
    <main id="page">
      {/* 헤더 */}

      {/* 마이프로필, 마이프로필수정, 리퀘스트 */}
      {!noHeader && !noBack && !noNotiBell && !noNavBar && <Header />}

      {/* 메인 */}
      {!noHeader && noBack && !noNotiBell && !noNavBar && <Header noBack />}

      {/* 알림창 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && <Header noNavBar />}

      {/* {!noHeader && !noBack && noNotiBell && noNavBar && <Header noNotiBell noNavBar />}
      {!noHeader && noBack && noNotiBell && noNavBar && <Header noBack noNotiBell noNavBar />} */}
      {/* 페이지 본문 */}
      {children}
    </main>
  );
}

export default Page;
// 모든 페이지를 wrapping 하는 컴포넌트
