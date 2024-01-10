'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';

const useAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const backdrop = 'blur';

  const openModal = (newTitle: string) => {
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
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col text-center gap-1 ">{title}</ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                onPress={() => {
                  onClose();
                  setTitle('');
                }}
                className="w-[15rem] bg-customYellow rounded-3xl cursor-pointer mb-0 font-medium"
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

  return { openModal, closeModal, AlertModal };
};

export default useAlertModal;
