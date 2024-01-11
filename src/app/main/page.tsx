'use client';

import FlirtingModal from '@/components/common/modal/FlirtingModal';
import React from 'react';

function Main() {
  // 알럿 사용법
  return (
    <div className="relative max-w-96 px-8 border-solid border-1 border-black ">
      <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-8"></header>
      <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">
        <FlirtingModal />
      </div>
    </div>
  );
}

export default Main;
