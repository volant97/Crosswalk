import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

interface PageProps {
  noHeader?: boolean;
  noBack?: boolean;
}

function Page({ noHeader, noBack, children }: PropsWithChildren<PageProps>) {
  return (
    <main id="page">
      {/* 헤더 */}
      {!noHeader && !noBack && <Header />}
      {!noHeader && noBack && <Header noBack />}

      {/* 페이지 본문 */}
      {children}
    </main>
  );
}

export default Page;
// 모든 페이지를 wrapping 하는 컴포넌트
