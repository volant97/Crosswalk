import FetchUserCards from '@/components/main/FetchUserCards';
import React from 'react';
import Page from '@/components/layout/Page';
import NavBar from '@/components/common/ui/NavBar';

//오류해결하기!
function MainPage() {
  return (
    <Page noBack>
      <div className="flex flex-col justify-center h-[calc(100dvh-17dvh)]">
        <FetchUserCards />
      </div>
      <NavBar />
    </Page>
  );
}

export default MainPage;

// className={`${
//   pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle
// } right-[40px] bg-customGreen`}
