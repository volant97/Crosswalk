'use client';

import React, { useState } from 'react';
import { BsArrowThroughHeartFill } from 'react-icons/bs';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps } from '@nextui-org/react';

const useCongratModal = () => {
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
  const AlertCongratModal = () => (
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
            <ModalHeader className="flex items-center flex-col text-center gap-2">
              <BsArrowThroughHeartFill size={50} className="fill-customGreen3 mb-3" />
              <p>소울메이트가 되신걸 축하합니다!</p>
              <p>
                <span className="font-bold text-customGreen3">초록불</span>이 밝게 빛나고 있네요.
              </p>
              <div className="flex flex-col text-center gap-2">
                <p className="text-[12px] text-gray-AAA mx-0 my-0 h-[12px]">오픈된 시크릿은 상대 프로필을</p>
                <p className="text-[12px] text-gray-AAA mx-0 my-0 h-[12px]">통해서 확인해보세요.</p>
              </div>
            </ModalHeader>
            <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
              <Button
                onPress={() => {
                  onClose();
                  setTitle('');
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

  return { openModal, closeModal, AlertCongratModal };
};

export default useCongratModal;
