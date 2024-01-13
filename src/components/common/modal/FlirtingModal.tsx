'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalProps,
  Input
} from '@nextui-org/react';
import { GoHeartFill } from 'react-icons/go';
import { TbSend } from 'react-icons/tb';
import { IoClose } from 'react-icons/io5';
import useAlertModal from './AlertModal';
import { sendFlirting } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  flirtingUserUid: string;
  nextCardBtn: () => void;
};

const FlirtingModal = ({ flirtingUserUid, nextCardBtn }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [flirtingMessage, setFlirtingMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backdrop = 'opaque';
  const { openModal, AlertModal } = useAlertModal();
  const getUid = useRecoilState(isUserState);
  const myUid = getUid[0]?.uid;

  const sendFlirtingMessage = async () => {
    const sentMessage = await sendFlirting(myUid, flirtingMessage, flirtingUserUid);
  };

  const MessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlirtingMessage(e.target.value);
  };

  const btnStyle =
    'absolute bottom-[-100px] ml-[20px] capitalize w-[9.75rem]] h-[3.125rem] hover:scale-110 text-white rounded-[2rem] font-semibold px-[1.8rem]';

  const profileDetailStyle =
    'ml-[20px] capitalize w-[8.3rem] h-[3.125rem] hover:scale-110 text-white rounded-[2rem] font-semibold px-[1.8rem] mt-[10px] mb-[5px] text-xs';

  return (
    <>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            router.push('/main');
            nextCardBtn();
          }}
          className={`${pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle} left-[-10px]`}
          color="default"
        >
          <IoClose size={20} /> 괜찮아요
        </Button>
        <Button
          onPress={() => onOpen()}
          className={`${
            pathname === `/main/${flirtingUserUid}` ? profileDetailStyle : btnStyle
          } right-[20px] bg-customGreen`}
        >
          <GoHeartFill size={20} /> 어필하기
        </Button>
      </div>
      <Modal
        className="w-[20rem]"
        placement="center"
        backdrop={backdrop as ModalProps['backdrop']}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col text-center gap-1 ">
                상대방에게 어필할 나만의
                <br /> <span className="text-rose-400">&quot;한마디&quot;</span>
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    if (flirtingMessage === '') {
                      openModal('내용 입력은 필수 입니다.');
                      return false;
                    }
                    sendFlirtingMessage();
                    setFlirtingMessage('');
                    onClose();
                  }}
                >
                  <Input
                    className="text-center"
                    value={flirtingMessage}
                    onChange={MessageHandler}
                    maxLength={15}
                    variant="bordered"
                    type="text"
                    placeholder="15글자 이내로 작성해주세요"
                    required
                  />
                  <Button
                    onClick={() => {
                      router.push('/main');
                      nextCardBtn();
                    }}
                    className="w-full bg-customGreen rounded-3xl cursor-pointer mb-10 font-medium mt-[30px] font-semibold text-center"
                    type="submit"
                    onPress={onClose}
                  >
                    <TbSend size={20} />
                    보내기
                  </Button>
                </form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
      {AlertModal()}
    </>
  );
};

export default FlirtingModal;
