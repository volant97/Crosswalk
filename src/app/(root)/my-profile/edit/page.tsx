import React from 'react';
import Page from '@/components/layout/Page';
import EditMyProfile from '@/components/my-profile/edit-my-profile/EditMyProfile';

function MyProfileEdit() {
  return (
    <Page noBackMain noNotiBell cs>
      <EditMyProfile />
    </Page>
  );
}

export default MyProfileEdit;
