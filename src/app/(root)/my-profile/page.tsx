import Page from '@/components/layout/Page';
import FetchMyProfileCard from '@/components/my_profile/FetchMyProfileCard';
import React from 'react';

function MyProfile() {
  return (
    <Page noNotiBell cs>
      <FetchMyProfileCard />
    </Page>
  );
}

export default MyProfile;
