'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalProps
} from '@nextui-org/react';
import Image from 'next/image';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import useAlertModal from './AlertModal';
import { changeStatusToDecline } from '@/lib/api/requestApi';

interface SignalOffModalProps {
  flirting_list_id?: number;
}

function SignalOffModal({ flirting_list_id }: SignalOffModalProps) {
  const { openModal } = useAlertModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur'); // 기본값을 'blur'로 설정
  const router = useRouter();
  const exitChatRoom = async () => {
    try {
      if (flirting_list_id) {
        await changeStatusToDecline(flirting_list_id);
      }
    } catch {
      openModal('서버와의 통신 중 에러가 발생했습니다.');
    }
  };

  return (
    <div>
      <button
        onClick={onOpen}
        className="absolute top-[5px] right-6 flex items-center justify-center border-1 border-solid border-black px-[0.5rem] py-[0.25rem] rounded-full w-[3.875rem] h-[2rem] mt-[0.75rem] text-gray-666"
      >
        <h1 className="text-[0.75rem] mr-[0.25rem]">거절</h1>
        <Image src="/assets/figmaImg/sadCircle.png" className="w-[1rem] h-[1rem]" width={100} height={100} alt="거절" />
      </button>
      <Modal
        // backdrop={backdrop}
        // backdrop="blur"
        backdrop={backdrop as ModalProps['backdrop']}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-[20rem] pt-[1.875rem] px-0 py-[1rem] pr-0 gap-[1.875rem] rounded-[1.5rem]"
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1 items-center justify-center w-15  rounded-lg bg-white text-center">
                <Image
                  src="/modal/traffic_light.png"
                  alt="Traffic Light"
                  width={90}
                  height={30}
                  className="pb-[0.75rem]"
                />
                <p>
                  신호등을 끄시겠습니까?
                  <br />
                  대화방을 나가면
                  <br />
                  다시 되돌릴 수 없습니다.
                </p>
              </ModalHeader>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onPress={() => {
                    onClose();
                    exitChatRoom();
                    router.back();
                  }}
                  className="w-[15rem] bg-customGreen3 rounded-3xl cursor-pointer mb-0 font-medium"
                  type="submit"
                >
                  네, 방 나가고 싶어요.
                </Button>
                <Button
                  onPress={onClose}
                  className="w-[15rem] text-[#aaa] bg-[#E6E6E6] rounded-3xl cursor-pointer mb-0  font-medium"
                  type="submit"
                >
                  아니요, 더 대화할래요.
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SignalOffModal;
