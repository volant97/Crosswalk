'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { TiWarning } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
import { logout } from '@/auth/auth';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { BiSolidLogOutCircle } from 'react-icons/bi';

const useLogoutAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const backdrop = 'blur';
  const route = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const openLogoutModal = (newTitle: string) => {
    setTitle(newTitle);
    setIsOpen(true);
  };

  const closeLogoutModal = () => {
    setIsOpen(false);
  };

  const LogoutAlertModal = () => (
    <Modal
      className="w-[20rem] text-gray-500"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeLogoutModal}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-1 ">
              <BiSolidLogOutCircle size={50} />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="success"
                variant="ghost"
                onPress={() => {
                  onClose();
                  setTitle('');
                  logout();
                  setUser(null);
                  route.push('/');
                }}
                className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium"
                type="submit"
              >
                <IoCheckmark size={50} />
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return { openLogoutModal, closeLogoutModal, LogoutAlertModal };
};

export default useLogoutAlertModal;
