'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { handleAcceptBtn, handleDeclinetBtn } from '@/lib/api/requestApi';

const useRequestModal = (listId: number) => {
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

  /**수락 ACCEPT */
  const AlertYellowModal = () => (
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
            <ModalHeader className="flex items-center flex-col text-center gap-1">
              <RiLightbulbFlashFill size={50} className="fill-yellow-400" />
              <p>축하합니다! </p>
              <p>신호등에 노란색 불이 켜졌어요.</p>
              <p>대화를 나누고 호감도를 올려보세요!</p>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                color="warning"
                variant="ghost"
                onPress={() => {
                  onClose();
                  setTitle('');
                  try {
                    handleAcceptBtn(listId);
                  } catch {
                    openModal('서버와의 통신 중 에러가 발생했습니다.');
                  }
                }}
                className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium bg-customGreen3 text-white text-[16px]"
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
              <RiLightbulbFlashFill size={50} className="fill-customRed" />
              <p>아쉬워요.</p>
              <p>신호등에 빨간색 불이 들어왔네요.</p>
              <p>더 좋은 만남을 기대할게요!</p>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 w-15 gap-2">
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onClose();
                  setTitle('');
                  try {
                    handleDeclinetBtn(listId);
                  } catch {
                    openModal('서버와의 통신 중 에러가 발생했습니다.');
                  }
                }}
                className="w-[15rem] rounded-3xl cursor-pointer mb-0 font-medium bg-customGreen3 text-white text-[16px]"
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

  return { openModal, closeModal, AlertYellowModal, AlertRedModal };
};

export default useRequestModal;
