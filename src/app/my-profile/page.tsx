'use client';
import ChooseAvatarModal from '@/components/common/modal/ChooseAvatarModal';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
// import useConfirmModal from '@/components/common/modal/useConfirmModal';
import React from 'react';

function MyProfile() {
  // const { openModal, confirmModal } = useConfirmModal();
  return (
    <div>
      <ConfirmModal />
      {/* <button
        onClick={() => {
          openModal('확인', '바보입니까?');
        }}
      ></button>
      {confirmModal('확인', '바보입니까?')} */}
      <ChooseAvatarModal />
    </div>
  );
}

export default MyProfile;
