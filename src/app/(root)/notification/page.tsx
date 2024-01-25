import Page from '@/components/layout/Page';
import NotificationList from '@/components/notification/NotificationList';
import React from 'react';

function Notification() {
  return (
    <Page noNavBar>
      <NotificationList />
    </Page>
  );
}

export default Notification;
