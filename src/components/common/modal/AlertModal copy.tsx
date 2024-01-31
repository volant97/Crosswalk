'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { TiWarning } from 'react-icons/ti';
import { usePathname } from 'next/navigation';

const useJsxAlertModal = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<React.ReactNode>();
  const backdrop = 'blur';

  const openJsxModal = (newTitle: React.ReactNode) => {
    setTitle(newTitle);
    setIsOpen(true);
  };

  const closeJsxModal = () => {
    setIsOpen(false);
  };

  const AlertJsxModal = () => (
    <Modal
      className="w-[20rem] text-red-500"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeJsxModal}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-1 ">
              <TiWarning size={50} />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <>
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
              </>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

  return { openJsxModal, closeJsxModal, AlertJsxModal };
};

export default useJsxAlertModal;
