import FetchUserCards from '@/components/main/FetchUserCards';
import React from 'react';
import Page from '@/components/layout/Page';
import NavBar from '@/components/common/ui/NavBar';

//오류해결하기!
function MainPage() {
  return (
    <Page noBack>
      {/* TODO: 함수 이름 같음 */}
      <FetchUserCards />
    </Page>
  );
}

export default MainPage;

// className={`${
//   pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle
// } right-[40px] bg-customGreen`}
