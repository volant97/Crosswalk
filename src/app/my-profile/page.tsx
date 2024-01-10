import ChooseAvatarModal from '@/components/common/modal/ChooseAvatarModal';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import React from 'react';

function MyProfile() {
  return (
    <div>
      <ConfirmModal />
      <ChooseAvatarModal />
    </div>
  );
}

export default MyProfile;
