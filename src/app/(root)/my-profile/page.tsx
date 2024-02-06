import React from 'react';
import Page from '@/components/layout/Page';
import MyProfile from '@/components/my-profile/MyProfile';

function MyProfilePage() {
  return (
    <Page noNotiBell cs>
      <MyProfile />
    </Page>
  );
}

export default MyProfilePage;
