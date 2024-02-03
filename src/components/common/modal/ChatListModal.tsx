'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import alertImg from '@assets/figmaImg/brakeHeart.png';
import Image from 'next/image';

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
      className="w-[20rem] text-yellow-400"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeModal}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-2 text-[20px]">
              <Image className="w-[52px] h-[52px]" src={alertImg} width={100} height={100} alt="깨진 하트 이미지" />
              <p>상대방과 나의 신호등 불이</p>
              <p>모두 켜지지 않았어요ㅠㅠ</p>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                onPress={() => {
                  onClose();
                }}
                className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium bg-customGreen3 text-white"
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

  return { openModal, closeModal, AlertChatListModal };
};

export default useChatListModal;
