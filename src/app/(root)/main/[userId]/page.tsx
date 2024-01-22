'use client';

import Page from '@/components/layout/Page';
import FetchUserProfile from '@/components/main/FetchUserProfile';
import { usePathname } from 'next/navigation';
import React from 'react';

function ProfleDetailPage() {
  const pathname = usePathname();
  const userId = pathname.substring(6, 42);
  return (
    <Page>
      <FetchUserProfile userId={userId} />
    </Page>
  );
}

export default ProfleDetailPage;
