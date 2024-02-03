'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { logout } from '@/auth/auth';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import logoutImg from '@assets/figmaImg/logOut.png';
import Image from 'next/image';

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
      className="w-[20rem]"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeLogoutModal}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-1 text-[20px]">
              <Image className="w-[52px] h-[52px]" src={logoutImg} width={100} height={100} alt="로그아웃 이미지" />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="success"
                onPress={() => {
                  onClose();
                  setTitle('');
                  logout();
                  setUser(null);
                  route.push('/');
                }}
                className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium bg-customGreen3 text-[16px]  text-white"
                type="submit"
              >
                확인
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
