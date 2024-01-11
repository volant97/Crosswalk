'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalProps,
  Input
} from '@nextui-org/react';
import { GoHeartFill } from 'react-icons/go';

const FlirtingModal: React.FC = () => {
  const [flirtingMessage, setFlirtingMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backdrop = 'opaque';

  const MessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlirtingMessage(e.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="danger"
          onPress={() => onOpen()}
          className="absolute bottom-10 ml-[20px] capitalize w-[80px] h-[80px] rounded-full hover:scale-110"
        >
          <GoHeartFill size={80} />
        </Button>
      </div>
      <Modal
        className="w-[20rem]"
        placement="center"
        // backdrop={backdrop as ModalProps['backdrop']}
        // backdrop="blur"
        backdrop={backdrop as ModalProps['backdrop']}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col text-center gap-1 ">
                상대방에게 어필할 나만의
                <br /> <span className="text-rose-400">&quot;한 마디&quot;</span>
              </ModalHeader>
              <ModalBody>
                <Input
                  value={flirtingMessage}
                  onChange={MessageHandler}
                  maxLength={15}
                  variant="bordered"
                  type="text"
                  label="Flirting"
                  placeholder="15글자 이내로 작성해주세요"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10 font-medium"
                  type="button"
                  onPress={onClose}
                >
                  보내기
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FlirtingModal;
