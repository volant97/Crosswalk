'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

function useConfirmModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur'); // 기본값을 'blur'로 설정
  const [isOpend, setIsOpend] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const openModal = (newTitle: string, newContent: string) => {
    setTitle(newTitle);
    setContent(newContent);
    setIsOpend(true);
  };

  const closeModal = () => {
    setIsOpend(false);
  };

  const confirmModal = (title: string, content: string) => {
    return (
      <div>
        {/* <Button variant="flat" color="warning" onPress={onOpen} className="capitalize">
        수정 완료
      </Button> */}
        <Button
          onPress={onOpen}
          className="w-[20rem] h-[3.125rem] bg-customYellow rounded-[1.875rem] cursor-pointer mb-0 font-medium"
          type="submit"
        >
          {title}
        </Button>
        <Modal
          backdrop={backdrop}
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          className="w-[20rem] pt-[1.875rem] px-0 py-[1rem] pr-0 gap-[1.875rem] rounded-[1.5rem]"
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col gap-1 items-center justify-center w-15  rounded-lg bg-white text-center">
                  {/* <Image
                  src="/modal/traffic_light.png"
                  alt="Traffic Light"
                  width={90}
                  height={30}
                  className="pb-[0.75rem]"
                /> */}
                  <p>{content}</p>
                </ModalHeader>
                <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                  <Button
                    onPress={onClose}
                    className="w-[15rem] bg-customYellow rounded-3xl cursor-pointer mb-0 font-medium"
                    type="submit"
                  >
                    네
                  </Button>
                  <Button
                    onPress={onClose}
                    className="w-[15rem] text-[#aaa] bg-[#E6E6E6] rounded-3xl cursor-pointer mb-0  font-medium"
                    type="submit"
                  >
                    아니요
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  };

  return { openModal, closeModal, confirmModal };
}

export default useConfirmModal;
