import React, { PropsWithChildren } from 'react';
import Header from './Header';

interface PageProps {
  noHeader?: boolean;
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
  noBackMain?: boolean;
  cs?: boolean;
}

function Page({ noHeader, noBack, noNavBar, noNotiBell, noBackMain, cs, children }: PropsWithChildren<PageProps>) {
  return (
    <main id="page">
      {/* 헤더 */}

      {/* 받은요청함 */}
      {!noHeader && !noBack && !noNotiBell && !noNavBar && !noBackMain && !cs && <Header />}

      {/* 메인 */}
      {!noHeader && noBack && !noNotiBell && !noNavBar && !noBackMain && !cs && <Header noBack />}

      {/* 알림창 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && !noBackMain && !cs && <Header noNavBar />}

      {/* 마이프로필 */}
      {!noHeader && !noBack && noNotiBell && !noNavBar && !noBackMain && cs && <Header noNotiBell cs />}

      {/* 마이프로필수정 */}
      {!noHeader && !noBack && noNotiBell && !noNavBar && noBackMain && cs && <Header noBackMain noNotiBell cs />}

      {/* 고객센터 */}
      {!noHeader && !noBack && noNotiBell && noNavBar && noBackMain && !cs && <Header noNavBar noBackMain noNotiBell />}

      {/* {!noHeader && !noBack && !noNotiBell && noNavBar && noBackMain && <Header noNavBar noBackMain />} */}
      {/* {!noHeader && !noBack && noNotiBell && noNavBar && <Header noNotiBell noNavBar />}
      {!noHeader && noBack && noNotiBell && noNavBar && <Header noBack noNotiBell noNavBar />} */}
      {/* 페이지 본문 */}
      {children}
    </main>
  );
}

export default Page;
// 모든 페이지를 wrapping 하는 컴포넌트
