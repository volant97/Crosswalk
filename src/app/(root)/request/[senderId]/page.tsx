import Page from '@/components/layout/Page';
import SenderProfile from '@/components/request/sender-profile/SenderProfile';
import React from 'react';

type Props = {
  params: {
    senderId: string;
  };
};

function ProfleDetailPage({ params }: Props) {
  const { senderId } = params;

  return (
    <Page noBackMain>
      <SenderProfile senderId={senderId} />
    </Page>
  );
}

export default ProfleDetailPage;
