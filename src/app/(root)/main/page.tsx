import React from 'react';
import Page from '@/components/layout/Page';
import UserCards from '@/components/main/UserCards';

function MainPage() {
  return (
    <Page noBack>
      <UserCards />
    </Page>
  );
}

export default MainPage;
