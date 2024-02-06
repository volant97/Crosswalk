import React from 'react';
import Page from '@/components/layout/Page';
import UserCards from '@/components/main/UserCards';
import DataDeletionNotice from '@/components/main/data-deletion-notice/DataDeletionNotice';

function MainPage() {
  return (
    <Page noBack>
      <UserCards />
      <DataDeletionNotice />
    </Page>
  );
}

export default MainPage;
