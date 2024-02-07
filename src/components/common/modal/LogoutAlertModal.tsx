'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logout } from '@/auth/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import logoutImg from '@assets/figmaImg/logOut.png';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';

const useLogoutAlertModal = () => {
  const route = useRouter();
  const backdrop = 'blur';

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const setUser = useSetRecoilState(userState);

  const openLogoutModal = (newTitle: string) => {
    setTitle(newTitle);
    setIsOpen(true);
  };

  const closeLogoutModal = () => {
    setIsOpen(false);
  };

  const LogoutAlertModal = () => (
    <Modal
      className="w-[320px] h-[250px] "
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeLogoutModal}
      hideCloseButton={true}
    >
      <ModalContent className=" flex flex-col justify-center  gap-[30px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center flex-col text-center text-[20px]  py-0 gap-4">
              <Image className="w-[52px] h-[52px]" src={logoutImg} width={100} height={100} alt="로그아웃 이미지" />
              <div>{title}</div>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center gap-0.625 w-15 py-0">
              <Button
                color="success"
                onPress={() => {
                  onClose();
                  setTitle('');
                  logout();
                  setUser(null);
                  route.push('/');
                }}
                className="w-[15rem] rounded-3xl cursor-pointer font-medium bg-customGreen3 text-white"
                type="submit"
              >
                확인
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  return { openLogoutModal, closeLogoutModal, LogoutAlertModal };
};

export default useLogoutAlertModal;
