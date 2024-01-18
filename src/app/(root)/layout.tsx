import Header from '@/components/layout/Header';
import React from 'react';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // overflow-y-auto 에서 hidden으로 임시적으로 바꿈
    <div className="flex flex-col items-center">
      <div className="h-screen w-full max-w-[430px] min-w-[360px] border-x overflow-y-auto overflow-x-hidden scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export default RootLayout;
