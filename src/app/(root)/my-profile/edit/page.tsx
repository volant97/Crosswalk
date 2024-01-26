import Page from '@/components/layout/Page';
import EditMyProfile from '@/components/my_profile/edit-my-profile/EditMyProfile';
import React from 'react';

function MyProfileEdit() {
  return (
    <Page noBackMain noNotiBell cs>
      <EditMyProfile />
    </Page>
  );
}

export default MyProfileEdit;
