import React from 'react';
import Page from '@/components/layout/Page';
import OtherPersonProfile from '@/components/other-person-profile/OtherPersonProfile';

type Props = {
  params: {
    otherPersonId: string;
  };
};

function ProfleDetailPage({ params }: Props) {
  const { otherPersonId } = params;

  return (
    <Page noBackMain noNavBar>
      <OtherPersonProfile otherPersonId={otherPersonId} />
    </Page>
  );
}

export default ProfleDetailPage;
