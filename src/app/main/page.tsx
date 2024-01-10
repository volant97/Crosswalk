'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import FlirtingModal from '@/components/common/modal/FlirtingModal';
import React from 'react';

function Main() {
  // 알럿 사용법
  const { openModal, AlertModal } = useAlertModal();
  return (
    <div className="relative max-w-96 px-8 border-solid border-1 border-black ">
      <header className="font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-8"></header>
      <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)]">
        <FlirtingModal />
        <button
          onClick={() => {
            openModal('로그아웃 되었습니다!');
          }}
        >
          알럿
        </button>
      </div>
      {AlertModal()}
    </div>
  );
}

export default Main;
