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
      className="w-[20rem]"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeModal}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-1 text-[20px]">
              <Image className="w-[52px] h-[52px]" src={alertImg} width={100} height={100} alt="경고 이미지" />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <>
                <Button
                  onPress={() => {
                    onClose();
                    setTitle('');
                  }}
                  className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium bg-customGreen3 text-white"
                  type="submit"
                >
                  확인
                </Button>
              </>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return { openModal, closeModal, AlertModal };
};

export default useAlertModal;
