import React from 'react';

function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-screen w-full max-w-[430px] min-w-[360px] border-x !overflow-y-hidden overflow-x-hidden scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export default RegisterLayout;
