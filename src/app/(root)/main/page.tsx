import React from 'react';
import Page from '@/components/layout/Page';
import UserCards from '@/components/main/UserCards';

//오류해결하기!
function MainPage() {
  return (
    <Page noBack>
      <UserCards />
    </Page>
  );
}

export default MainPage;
