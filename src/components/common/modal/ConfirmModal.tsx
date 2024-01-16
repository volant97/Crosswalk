'use client';
import React, { useEffect } from 'react';
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
import { isUserState } from '@/recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { supabase } from '@/lib/supabase-config';
import { registerState } from '@/recoil/register';
import useAlertModal from './AlertModal';
import { useRouter } from 'next/navigation';
import { postRegister } from '@/lib/api/SupabaseApi';

type Props = {
  name: string | null;
  height: number | null;
  age: number | null;
  gender: string | null;
  selectedImg: string;
  file: any;
};

function ConfirmModal({ name, height, age, gender, selectedImg, file }: Props) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal, AlertModal } = useAlertModal();
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const { uid } = useRecoilValue(isUserState);
  async function uploadFile(file: any) {
    try {
      if (file) {
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${selectedImg}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      } else {
        return null;
      }
    } catch (error) {
      console.log('error', error);
      openModal('사진변경 중 오류 발생');
    }

    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    setRegisterData((prevData) => ({
      ...prevData,
      user_img: userImg?.publicUrl,
      name: name,
      age: Number(age),
      height: Number(height),
      gender,
      uid: uid
    }));
  }

  async function updateData() {
    try {
      await postRegister(registerData);
    } catch (error) {
      openModal('서버와의 통신을 실패했습니다.');
    }
  }

  useEffect(() => {
    if (registerData) {
      updateData();
    }

    console.log('updateData', registerData);
  }, [registerData]);

  return (
    <div>
      {/* <Button variant="flat" color="warning" onPress={onOpen} className="capitalize">
        수정 완료
      </Button> */}
      <Button
        onPress={onOpen}
        className="w-[20rem] ml-[-21px] mt-[2rem] h-[3.125rem] bg-customGreen rounded-[1.875rem] cursor-pointer mb-0 font-semibold"
        type="submit"
      >
        수정하기
      </Button>
      <Modal
        // backdrop={backdrop}
        // backdrop="blur"
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
                <p>변경 사항을 저장하시겠습니까?</p>
              </ModalHeader>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onClick={() => {
                    uploadFile(file);
                    onClose();
                    router.push('/my-profile');
                  }}
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
      {AlertModal()}
    </div>
  );
}

export default ConfirmModal;
