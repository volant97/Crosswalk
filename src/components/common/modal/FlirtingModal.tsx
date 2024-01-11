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

type Props = {
  flirtingUserUid: string;
};

const FlirtingModal = ({ flirtingUserUid }: Props) => {
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
          className="absolute bottom-[-140px] left-[20px] ml-[20px] capitalize w-[80px] h-[80px] rounded-full hover:scale-110"
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
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    console.log('16dc2297-debc-4c90-896c-f564fb7b1c7a', flirtingUserUid);
                    console.log('플러팅 메시지', flirtingMessage);
                    setFlirtingMessage('');
                    onClose();
                  }}
                >
                  <Input
                    value={flirtingMessage}
                    onChange={MessageHandler}
                    maxLength={15}
                    variant="bordered"
                    type="text"
                    label="Flirting"
                    placeholder="15글자 이내로 작성해주세요"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10 font-medium"
                  type="submit"
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
