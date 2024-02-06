import React from 'react';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <main className="h-[100dvh] w-full max-w-[430px] min-w-[360px] border-x overflow-y-auto overflow-x-hidden scrollbar-hide">
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
