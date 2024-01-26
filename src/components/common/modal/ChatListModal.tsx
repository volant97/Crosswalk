'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { handleAcceptBtn } from '@/lib/api/requestApi';
import { HiMiniBellAlert } from 'react-icons/hi2';

const useChatListModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const backdrop = 'blur';

  const openModal = (title: string) => {
    setTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /**호감도 100% 축하 모달 */
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
              <p>알림창의 알림메시지를 클릭하여</p>
              <p>신호등을 켜주세요!</p>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onClose();
                  setTitle('');
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
