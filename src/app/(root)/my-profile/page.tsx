import NavBar from '@/components/common/ui/NavBar';
import Page from '@/components/layout/Page';
import MyProfile from '@/components/my_profile/MyProfile';
import React from 'react';

function MyProfilePage() {
  return (
    <Page noNotiBell cs>
      <MyProfile />
      {/* <NavBar /> */}
    </Page>
  );
}

export default MyProfilePage;
