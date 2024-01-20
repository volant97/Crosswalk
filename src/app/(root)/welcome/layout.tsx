import React from 'react';

function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-screen w-full max-w-[430px] !min-w-[360px] border-x !overflow-y-hidden overflow-x-hidden scrollbar-hide flex justify-center items-start gap-[260px] pt-[200px] pr-[30px] pb-40px] pl-[30px]">
        {children}
      </div>
    </div>
  );
}

export default WelcomeLayout;
