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
import { userState } from '@/recoil/user';

type Props = {
  name: string;
  height: number;
  age: number;
  gender: string;
  selectedImg: string;
  file: any;
};
// type Props = {
//   name: string | null;
//   height: number | null;
//   age: number | null;
//   gender: string | null;
//   selectedImg: string;
//   file: any;
// };

function ConfirmModal({ name, height, age, gender, selectedImg, file }: Props) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal, AlertModal } = useAlertModal();
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myInfo = registerData?.profile;
  // const { uid } = useRecoilValue(isUserState);
  const uid = registerData?.id;

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
    const updatedImg = file !== 'test' ? userImg?.publicUrl : myInfo?.user_img;
    // any타입
    setRegisterData((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        user_img: updatedImg,
        name: name,
        age: Number(age),
        height: Number(height),
        gender,
        uid
      }
    }));
  }

  async function updateData() {
    try {
      // dd
      console.log('registerData !!!', registerData);
      await postRegister(registerData?.id, registerData?.profile);
    } catch (error) {
      openModal('서버와의 통신을 실패했습니다.');
    }
  }

  // 임시로 주석해줬음
  // useEffect(() => {
  //   if (registerData === null) {
  //     updateData();
  //   }

  //   console.log('updateData', registerData);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [registerData]);

  return (
    <div>
      <Button
        onPress={onOpen}
        className="w-[20rem] ml-[-21px] mt-[2rem] h-[3.125rem] bg-customGreen rounded-[1.875rem] cursor-pointer mb-0 font-semibold"
        type="submit"
      >
        수정하기
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-[20rem] pt-[1.875rem] px-0 py-[1rem] pr-0 gap-[1.875rem] rounded-[1.5rem]"
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1 items-center justify-center w-15  rounded-lg bg-white text-center">
                <p>변경 사항을 저장하시겠습니까?</p>
              </ModalHeader>
              <ModalFooter className="flex flex-col items-center justify-center h-2.625  px-1.25 gap-0.625 w-15 gap-2">
                <Button
                  onClick={async () => {
                    await uploadFile(file);
                    await updateData();
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
