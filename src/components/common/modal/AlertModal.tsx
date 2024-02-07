'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import alertImg from '@assets/figmaImg/dangerCircle.png';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';

const useAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | React.ReactNode>('');
  const backdrop = 'blur';

  const openModal = (newTitle: string | React.ReactNode) => {
    setTitle(newTitle);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const AlertModal = () => (
    <Modal
      className=" w-[320px] h-[250px] "
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeModal}
      hideCloseButton={true}
    >
      <ModalContent className=" flex flex-col justify-center  gap-[30px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center flex-col text-center text-[20px]  py-0 gap-4">
              <Image className="w-[52px] h-[52px]" src={alertImg} width={100} height={100} alt="경고 이미지" />
              <div>{title}</div>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center gap-0.625 w-15 py-0  ">
              <>
                <Button
                  onPress={() => {
                    onClose();
                    setTitle('');
                  }}
                  className="w-[15rem] rounded-3xl cursor-pointer font-medium bg-customGreen3 text-white "
                  type="submit"
                >
                  확인
                </Button>
              </>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  return { openModal, closeModal, AlertModal };
};

export default useAlertModal;
