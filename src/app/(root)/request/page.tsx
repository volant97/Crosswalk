import ReceivedRequest from '@/components/request/ReceivedRequest';
import Page from '@/components/layout/Page';
import React from 'react';
import NavBar from '@/components/common/ui/NavBar';

function Request() {
  return (
    <Page>
      <ReceivedRequest />

      <NavBar />
    </Page>
  );
}

export default Request;
