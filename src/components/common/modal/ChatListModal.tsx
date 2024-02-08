'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import alertImg from '@assets/figmaImg/brakeHeart.png';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';

const useChatListModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const backdrop = 'blur';

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const AlertChatListModal = () => (
    <Modal
      className="w-[320px] h-[250px]"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeModal}
      hideCloseButton={true}
    >
      <ModalContent className="flex flex-col justify-center  gap-[30px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center flex-col text-center  text-[20px] py-0 gap-4">
              <Image className="w-[52px] h-[52px]" src={alertImg} width={100} height={100} alt="깨진 하트 이미지" />
              <div>
                <p>신호등이 빨간불일 때는</p>
                <p>대화를 할 수 없어요.</p>
              </div>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center w-15 py-0">
              <Button
                onPress={() => {
                  onClose();
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

  return { openModal, closeModal, AlertChatListModal };
};

export default useChatListModal;
