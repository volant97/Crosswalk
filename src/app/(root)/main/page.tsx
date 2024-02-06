import React from 'react';
import Page from '@/components/layout/Page';
import UserCards from '@/components/main/UserCards';

function MainPage() {
  return (
    <Page noBack>
      <UserCards />
      {/* DB 리셋 안내 제작중 */}
      {/* <DataDeletionNotice /> */}
    </Page>
  );
}

export default MainPage;
