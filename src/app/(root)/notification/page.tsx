import Page from '@/components/layout/Page';
import NotificationList from '@/components/notification/NotificationList';
import { Props } from '@/types/childrenPropsType';
import React from 'react';

function Notification() {
  return (
    <Page noNavBar>
      <NotificationList />
    </Page>
  );
}

export default Notification;
