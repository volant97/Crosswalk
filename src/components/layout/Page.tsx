import React, { PropsWithChildren } from 'react';
import Header from './Header';

interface PageProps {
  noHeader?: boolean;
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
  noBackMain?: boolean;
}

function Page({ noHeader, noBack, noNavBar, noNotiBell, noBackMain, children }: PropsWithChildren<PageProps>) {
  return (
    <main id="page">
      {/* 헤더 */}

      {/* 마이프로필, 리퀘스트 */}
      {!noHeader && !noBack && !noNotiBell && !noNavBar && !noBackMain && <Header />}

      {/* 메인 */}
      {!noHeader && noBack && !noNotiBell && !noNavBar && !noBackMain && <Header noBack />}

      {/* 알림창 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && !noBackMain && <Header noNavBar />}

      {/* 마이프로필수정 */}
      {!noHeader && !noBack && !noNotiBell && !noNavBar && noBackMain && <Header noBackMain />}

      {/* 고객센터 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && noBackMain && <Header noNavBar noBackMain />}

      {/* {!noHeader && !noBack && noNotiBell && noNavBar && <Header noNotiBell noNavBar />}
      {!noHeader && noBack && noNotiBell && noNavBar && <Header noBack noNotiBell noNavBar />} */}
      {/* 페이지 본문 */}
      {children}
    </main>
  );
}

export default Page;
// 모든 페이지를 wrapping 하는 컴포넌트
