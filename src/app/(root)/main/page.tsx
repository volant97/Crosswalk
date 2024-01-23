import FetchUserCards from '@/components/main/FetchUserCards';
import React from 'react';
import Page from '@/components/layout/Page';
import Button from '@/components/Button';
import { IoClose } from 'react-icons/io5';
import { GoHeartFill } from 'react-icons/go';

//오류해결하기!
function MainPage() {
  return (
    <Page noBack>
      <div className="flex flex-col justify-center h-[calc(100dvh-16dvh)]">
        <FetchUserCards />
      </div>
    </Page>
  );
}

export default MainPage;

// className={`${
//   pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle
// } right-[40px] bg-customGreen`}
