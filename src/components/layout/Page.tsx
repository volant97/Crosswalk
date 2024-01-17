import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

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
      {!noHeader && !noBack && !noNotiBell && !noNavBar && <Header />}
      {!noHeader && noBack && !noNotiBell && !noNavBar && <Header noBack />}
      {!noHeader && !noBack && noNotiBell && noNavBar && <Header noNotiBell noNavBar />}
      {!noHeader && noBack && noNotiBell && noNavBar && <Header noBack noNotiBell noNavBar />}
      {/* 페이지 본문 */}
      {children}
    </main>
  );
}

export default Page;
// 모든 페이지를 wrapping 하는 컴포넌트
