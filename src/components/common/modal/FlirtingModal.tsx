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

import useAlertModal from './AlertModal';
import { sendFlirting } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { registerState } from '@/recoil/register';
import { nextSlideState } from '@/recoil/currentIndex';
import { userState } from '@/recoil/user';
import useReloadCardModal from './ReloadCardModal';

const useFlirtingModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = Number(searchParams.get('index') || 0);
  const [flirtingMessage, setFlirtingMessage] = useState('');
  const backdrop = 'opaque';
  const { openReloadCardModal, reloadCardModal } = useReloadCardModal();
  const { openModal, AlertModal } = useAlertModal();
  const [getUid, setGetUid] = useRecoilState(userState);
  const myUid = getUid?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [flirtingUserUid, setFlirtingUserUid] = useState('');
  const [isSwitchNextSlide, setIsSwitchNextSlide] = useRecoilState(nextSlideState);
  const [swiper, setSwiper] = useState<any>(null);

  const openFlirtingModal = (userId: string, swiper: any) => {
    setFlirtingUserUid(userId);
    setSwiper(swiper);
    setIsOpen(true);
  };

  const closeFlirtingModal = () => {
    setIsOpen(false);
  };

  const sendFlirtingMessage = async () => {
    if (!myUid) return;
    await sendFlirting(myUid, flirtingMessage, flirtingUserUid);
  };

  const MessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlirtingMessage(e.target.value);
  };

  const firstNextSlide = () => {
    swiper.slideTo(1, 400, false);
  };

  const flirtingModal = () => (
    <>
      <Modal
        className="w-[20rem]"
        placement="center"
        backdrop={backdrop as ModalProps['backdrop']}
        isOpen={isOpen}
        onClose={closeFlirtingModal}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col text-center gap-1 ">
                상대방에게 어필할 나만의
                <br /> <span className="text-lightRed">&quot;한마디&quot;</span>
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    firstNextSlide();
                    if (flirtingMessage === '') {
                      openModal('내용 입력은 필수 입니다.');
                      return false;
                    }
                    sendFlirtingMessage();
                    setFlirtingMessage('');
                    onClose();

                    console.log('플러팅 모달에서의 Uid', flirtingUserUid);
                    setIsSwitchNextSlide(true);

                    console.log('확인');
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
                    className="w-full bg-customGreen rounded-3xl cursor-pointer mb-10 mt-[30px] font-semibold text-center"
                    type="submit"
                    onPress={onClose}
                  >
                    <Image
                      className="w-[1rem] h-[1rem]"
                      src="/assets/figmaImg/Plain.png"
                      width={100}
                      height={100}
                      alt="보내기"
                    />
                    보내기
                  </Button>
                </form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
      {reloadCardModal()}
      {AlertModal()}
    </>
  );

  return { openFlirtingModal, closeFlirtingModal, flirtingModal };
};

export default useFlirtingModal;
