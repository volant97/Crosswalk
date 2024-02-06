/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { postRegister } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import useAlertModal from './AlertModal';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

type Props = {
  name: string | undefined;
  height: number | string | undefined;
  age: number | undefined;
  selectedImg: string;
  file: any;
  avatar: number | undefined;
};

function ConfirmModal({ name, height, age, selectedImg, file, avatar }: Props) {
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [registerData, setRegisterData] = useRecoilState(userState);
  const uid = registerData?.id;
  const myInfo = registerData?.profile;
  const [isLoading, setIsLoading] = useState<any>(false);

  async function uploadFile(file: any) {
    try {
      if (file) {
        // 로딩중
        setIsLoading(true);
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${selectedImg}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error('사진변경 중 오류가 발생하였습니다.', error);
      openModal('사진변경 중 오류가 발생하였습니다.');
    }

    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    const updatedImg = file !== 'test' ? userImg?.publicUrl : myInfo?.user_img;
    // Todo : any타입
    setRegisterData((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        user_img: updatedImg,
        name: name,
        age: Number(age),
        height: Number(height),
        uid,
        avatar
      }
    }));
  }

  async function updateData() {
    try {
      await postRegister(registerData?.id, registerData?.profile);
    } catch (error) {
      openModal('서버와의 통신을 실패했습니다.');
    }
    // 로딩끝
    setIsLoading(false);
  }

  async function uploadAndNavigate(file: any) {
    try {
      await uploadFile(file);
      await updateData();
    } catch (error) {
      openModal('오류가 발생했습니다.');
    }
  }

  useEffect(() => {
    if (registerData === null) {
      updateData();
    }
  }, [registerData]);

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        className="flex justify-center items-center w-[320px] h-[50px] bg-customGreen3 rounded-full cursor-pointer text-[18px] font-[600] leading-[20px] capitalize text-white"
        type="submit"
      >
        수정하기
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-[20rem] pt-[1.875rem] px-0 py-[1rem] pr-0 gap-[1.875rem] rounded-[1.5rem]"
        hideCloseButton={true}
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
                    if (!age) return;
                    if (age <= 14) {
                      openModal(
                        <>
                          저희 서비스는 만 14세 이상만
                          <br />
                          이용하실 수 있습니다.
                        </>
                      );
                      onClose();
                      return false;
                    }
                    await uploadAndNavigate(file);
                    onClose();
                    router.push('/my-profile');
                  }}
                  className="w-[15rem] bg-customGreen3 rounded-3xl cursor-pointer mb-0 font-medium"
                  type="submit"
                  isLoading={isLoading}
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
    </Fragment>
  );
}

export default ConfirmModal;
