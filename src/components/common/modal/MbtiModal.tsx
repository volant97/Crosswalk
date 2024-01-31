'use client';

import React, { useState } from 'react';
import mbti from '../../../data/mbti_data.json';
import { Modal, ModalContent, ModalFooter, Button, ModalProps, ModalBody } from '@nextui-org/react';
import { IoCheckmark } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import useAlertModal from './AlertModal';
import { RegisterType } from '@/types/registerType';
import { userState } from '@/recoil/user';

const MbtiModal = () => {
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myInfo = registerData?.profile;
  const [selectedMbti, setSelectedMbti] = useState<string | undefined | null>(myInfo?.mbti);
  const { openModal, AlertModal } = useAlertModal();
  const [isOpen, setIsOpen] = useState(false);

  const openMbtiModal = () => {
    setIsOpen(true);
  };

  const closeMbtiModal = () => {
    setIsOpen(false);
  };

  const handleMbtiClick = (item: string) => {
    if (selectedMbti === item) setSelectedMbti('');
    else setSelectedMbti(item);
  };

  const mbtiModal = () => (
    <>
      <Modal className="w-[20rem] text-red-500" placement="bottom" isOpen={isOpen} onClose={closeMbtiModal}>
        <ModalContent className="w-full">
          {(onClose) => (
            <div>
              <ModalBody>
                <div className="grid grid-cols-4 gap-3 w-full flex-wrap p-[15px]">
                  {mbti.map((item, index) => (
                    <div
                      onClick={() => {
                        handleMbtiClick(item);
                      }}
                      className={`w-[50px] py-[5px] px-[30px] flex justify-center border-solid  border-1  rounded-[50px] cursor-pointer ${
                        selectedMbti === item ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
                      }`}
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onClick={() => {
                    if (selectedMbti === '') {
                      openModal('MBTI를 선택해주세요!');
                      return;
                    }
                    // any타입
                    setRegisterData((prevData: any) => ({
                      ...prevData,
                      profile: {
                        ...prevData?.profile,
                        mbti: selectedMbti
                      }
                    }));

                    onClose();
                  }}
                  className="w-[18.75rem] text-[1.125rem] bg-customGreen3 rounded-3xl cursor-pointer font-semibold mb-[1.1rem]"
                  type="submit"
                >
                  확인
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
      {AlertModal()}
    </>
  );

  return { openMbtiModal, closeMbtiModal, mbtiModal };
};

export default MbtiModal;
