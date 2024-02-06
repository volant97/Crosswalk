import React from 'react';
import Page from '@/components/layout/Page';
import NotificationList from '@/components/notification/NotificationList';

function Notification() {
  return (
    <Page noNavBar>
      <NotificationList />
    </Page>
  );
}

export default Notification;
