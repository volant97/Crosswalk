import React from 'react';

function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center ">
      <div className="h-[100dvh] w-full max-w-[430px] !min-w-[360px] border-x !overflow-y-hidden overflow-x-hidden scrollbar-hide ">
        <div className="w-full h-full px-[30px] pb-[40px]">{children}</div>
      </div>
    </div>
  );
}

export default WelcomeLayout;
