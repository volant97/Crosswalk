'use client';

import React, { useState } from 'react';
import interestData from '../../../data/interestData.json';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalProps, ModalBody } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import useAlertModal from './AlertModal';
import { RegisterType } from '@/types/registerType';

const InterestModal = () => {
  const { interests } = interestData;
  const [registerData, setRegisterData] = useRecoilState<RegisterType>(registerState);
  const myInfo = registerData;
  const [activeStates, setActiveStates] = useState<any>(myInfo?.interest);
  const maxSelectedInterests = 3; // 최대 선택 가능한 관심사 개수
  const { openModal, AlertModal } = useAlertModal();
  const [isOpen, setIsOpen] = useState(false);

  const openInterestModal = () => {
    setIsOpen(true);
  };

  const closeInterestModal = () => {
    setIsOpen(false);
  };

  const handleInterestClick = (interest: string) => {
    if (activeStates?.includes(interest)) {
      const updatedActiveStates = activeStates?.filter((selectedInterest: any) => selectedInterest !== interest);
      setActiveStates(updatedActiveStates);
    } else if (activeStates && activeStates?.length >= maxSelectedInterests) {
      openModal(`관심사는 최대 ${maxSelectedInterests}개까지 선택 가능합니다.`);
    } else {
      setActiveStates([...activeStates, interest]);
    }
  };

  const interestModal = () => (
    <>
      <Modal className="w-[20rem] text-red-500" placement="bottom" isOpen={isOpen} onClose={closeInterestModal}>
        <ModalContent className="w-full">
          {(onClose) => (
            <div>
              <ModalBody>
                <ul className=" flex flex-wrap gap-3 justify-center pt-[1.8rem]">
                  {interests.map((interest) => {
                    const isSelected = activeStates?.includes(interest.name);
                    return (
                      <li
                        key={interest.id}
                        className={`py-2 px-6 rounded-full cursor-pointer border ${
                          isSelected ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
                        }`}
                        onClick={() => {
                          handleInterestClick(interest.name);
                        }}
                      >
                        {interest.name}
                      </li>
                    );
                  })}
                </ul>
              </ModalBody>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onClick={() => {
                    if (activeStates && activeStates.length < 1) {
                      openModal('관심사를 선택해주세요!');
                      return;
                    }
                    setRegisterData((prevValue) => ({
                      ...prevValue,
                      interest: activeStates
                    }));
                    onClose();
                  }}
                  className="w-[18.75rem] bg-customGreen rounded-3xl cursor-pointer mb-0 font-semibold text-[1.125rem] mb-[1.1rem]"
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

  return { openInterestModal, closeInterestModal, interestModal };
};

export default InterestModal;
