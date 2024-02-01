'use client';

import { NextUIProvider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import AuthenticationLayer from '../common/AuthenticationLayer';

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  // 개발자 도구 막기 (dev mode)
  const handleContextMenu = (e: any) => {
    e.preventDefault(); // 우클릭 시 기본 동작 막기
    // 원하는 작업 수행
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      // F12 키의 keyCode는 123입니다.
      if (e.keyCode === 123) {
        e.preventDefault();
        alert('개발자 도구를 열 수 없습니다.');
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        e.preventDefault();
        alert('개발자 도구를 열 수 없습니다.');
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
        e.preventDefault();
        alert('개발자 도구를 열 수 없습니다.');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    // div 개발자 도구 막기 (dev mode)
    <div onContextMenu={handleContextMenu}>
      <RecoilRoot>
        <NextUIProvider>
          <AuthenticationLayer>{children}</AuthenticationLayer>
        </NextUIProvider>
      </RecoilRoot>
    </div>
  );
}

export default Provider;
