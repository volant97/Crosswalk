import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <NextUIProvider>{children}</NextUIProvider>
    </RecoilRoot>
  );
}

export default Provider;
