'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { handleAcceptBtn } from '@/lib/api/requestApi';
import { HiMiniBellAlert } from 'react-icons/hi2';

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
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-2">
              <HiMiniBellAlert size={50} className="fill-black mb-3" />
              <p>상대방과 나의 신호등 불이</p>
              <p>모두 켜지지 않았어요!</p>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onClose();
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

  return { openModal, closeModal, AlertChatListModal };
};

export default useChatListModal;
