'use client';

import NavBar from '@/components/common/ui/NavBar';
import FetchUserCards from '@/components/main/FetchUserCards';
import Link from 'next/link';
import React from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import Page from '@/components/layout/Page';
import Button from '@/components/Button';
import { IoClose } from 'react-icons/io5';
import { GoHeartFill } from 'react-icons/go';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalProps, Input } from '@nextui-org/react';

//오류해결하기!
function MainPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // router.push('/main');
  //           nextCardBtn();
  return (
    <Page noBack>
      <FetchUserCards />

      <div className="flex gap-3 px-[20px] flex justify-between gap-x-2">
        <Button onClick={() => {}} color="default">
          <IoClose size={20} /> 괜찮아요
        </Button>
        <Button onClick={onOpen} color="green">
          <GoHeartFill size={20} /> 어필하기
        </Button>
      </div>
    </Page>
  );
}

export default MainPage;

// className={`${
//   pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle
// } right-[40px] bg-customGreen`}
