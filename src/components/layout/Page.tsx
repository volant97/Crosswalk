import React, { PropsWithChildren } from 'react';
import Header from './Header';
import NavBar from '../common/ui/NavBar';

interface PageProps {
  noHeader?: boolean;
  noBack?: boolean;
  noNavBar?: boolean;
  noNotiBell?: boolean;
  noBackMain?: boolean;
  cs?: boolean;
}

/**모든 페이지를 wrapping 하는 컴포넌트 */
function Page({ noHeader, noBack, noNavBar, noNotiBell, noBackMain, cs, children }: PropsWithChildren<PageProps>) {
  return (
    <div id="page" className="relative">
      {/* Header */}
      {/* 받은요청함 */}
      {!noHeader && !noBack && !noNotiBell && !noNavBar && !noBackMain && !cs && <Header />}

      {/* 메인 */}
      {!noHeader && noBack && !noNotiBell && !noNavBar && !noBackMain && !cs && <Header noBack />}

      {/* 알림창 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && !noBackMain && !cs && <Header />}

      {/* 상대 상세페이지 */}
      {!noHeader && !noBack && !noNotiBell && noNavBar && noBackMain && !cs && <Header noBackMain />}

      {/* 마이프로필 */}
      {!noHeader && !noBack && noNotiBell && !noNavBar && !noBackMain && cs && <Header noNotiBell cs />}

      {/* 마이프로필수정 */}
      {!noHeader && !noBack && noNotiBell && !noNavBar && noBackMain && cs && <Header noBackMain noNotiBell cs />}

      {/* 고객센터 */}
      {!noHeader && !noBack && noNotiBell && noNavBar && noBackMain && !cs && <Header noBackMain noNotiBell />}

      {/* Main */}
      <main
        className={`${
          noNavBar ? 'h-[calc(100dvh-9dvh)]' : 'h-[calc(100dvh-9dvh-8.8dvh)]'
        } overflow-y-scroll scrollbar-hide`}
      >
        {children}
      </main>

      {/* NabBar */}
      {noNavBar ? null : <NavBar />}
    </div>
  );
}

export default Page;
