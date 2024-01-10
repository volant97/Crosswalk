'use client';
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import avatarData from '../../../data/avatar_data.json';

function ChooseAvatarModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur'); // 기본값을 'blur'로 설정
  const { avatars } = avatarData;
  return (
    <div>
      {/* <Image
        src="/modal/pen.png"
        alt="아바타 수정"
        width={24}
        height={24}
        className="cursor-pointer w-[1rem] h-[1rem]"
      ></Image> */}
      <Button variant="flat" color="default" onPress={onOpen} className="capitalize w-[1rem] bg-white">
        <Image
          src="/modal/pen.png"
          alt="아바타 수정"
          width={24}
          height={24}
          className="cursor-pointer w-[1rem] h-[1rem]"
        ></Image>
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
                <p className="pb-[1rem]">캐릭터를 선택해주세요!</p>
                <ul className="flex flex-row flex-wrap gap-3 items-center justify-center w-15 ">
                  {avatars.map((avatar) => {
                    return (
                      <li
                        key={avatar.id}
                        className="cursor-pointer transform hover:scale-105 transition-transform ease-in-out duration-100"
                      >
                        <Image
                          src={`/avatars/${avatar.img_path}`}
                          alt="Avatar Option"
                          width={90}
                          height={90}
                          className="pb-[0.75rem]"
                        />
                      </li>
                    );
                  })}
                </ul>
              </ModalHeader>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onPress={onClose}
                  className="w-[15rem] bg-customYellow rounded-3xl cursor-pointer mb-0 font-medium"
                  type="submit"
                >
                  선택완료
                </Button>
                <Button
                  onPress={onClose}
                  className="w-[15rem] text-[#aaa] bg-[#E6E6E6] rounded-3xl cursor-pointer mb-0  font-medium"
                  type="submit"
                >
                  취소
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ChooseAvatarModal;
