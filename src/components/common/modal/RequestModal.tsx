'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { supabase } from '@/lib/supabase-config';

const useRequestModal = (listId: number) => {
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

  /**수락 ACCEPT */
  const AlertYellowModal = () => (
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
            <ModalHeader className="flex items-center flex-col text-center gap-1 ">
              <RiLightbulbFlashFill size={50} />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="warning"
                variant="ghost"
                onPress={async () => {
                  onClose();
                  setTitle('');
                  await supabase
                    .from('flirting_list')
                    .update({ status: 'ACCEPT', receiver_is_read_in_noti: false, sender_is_read_in_noti: false })
                    .eq('id', listId)
                    .eq('status', 'READ')
                    .select();
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

  /**거절 DECLINE */
  const AlertRedModal = () => (
    <Modal
      className="w-[20rem] text-customRed"
      placement="center"
      backdrop={backdrop as ModalProps['backdrop']}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex items-center flex-col text-center gap-1 ">
              <RiLightbulbFlashFill size={50} />
              {title}
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 w-15 gap-2">
              <Button
                color="danger"
                variant="ghost"
                onPress={async () => {
                  onClose();
                  setTitle('');
                  await supabase
                    .from('flirting_list')
                    .update({ status: 'DECLINE', receiver_is_read_in_noti: true, sender_is_read_in_noti: true })
                    .eq('id', listId)
                    .eq('status', 'READ')
                    .select();
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

  return { openModal, closeModal, AlertYellowModal, AlertRedModal };
};

export default useRequestModal;
