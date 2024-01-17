'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthenticationLayer from '../common/AuthenticationLayer';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <AuthenticationLayer>{children}</AuthenticationLayer>
      </NextUIProvider>
    </RecoilRoot>
  );
}

export default Provider;
