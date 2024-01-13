'use client';
import ChooseAvatarModal from '@/components/common/modal/ChooseAvatarModal';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import NavBar from '@/components/common/ui/NavBar';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoIosArrowRoundBack } from 'react-icons/io';

function MyProfile() {
  return (
    <>
      <ConfirmModal />
      <ChooseAvatarModal />
    </>
  );
}

export default MyProfile;
