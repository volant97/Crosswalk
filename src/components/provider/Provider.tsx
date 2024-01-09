'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import GetUser from '../common/GetUser';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <GetUser>{children}</GetUser>
      </NextUIProvider>
    </RecoilRoot>
  );
}

export default Provider;
