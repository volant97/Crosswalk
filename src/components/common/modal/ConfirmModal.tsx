'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { supabase } from '@/lib/supabase-config';
import useAlertModal from './AlertModal';
import { useRouter } from 'next/navigation';
import { postRegister } from '@/lib/api/SupabaseApi';
import { userState } from '@/recoil/user';

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal, AlertModal } = useAlertModal();
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myInfo = registerData?.profile;
  // const { uid } = useRecoilValue(isUserState);
  const uid = registerData?.id;
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
      console.error('error', error);
      openModal('사진변경 중 오류 발생');
    }

    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    // console.log('지훈님:', userImg);
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
        uid,
        avatar
      }
    }));
  }

  async function updateData() {
    try {
      // console.log('registerData !!!', registerData);
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

    // console.log('updateData', registerData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData]);
  // 임시로 주석해줬음
  // useEffect(() => {
  //   if (registerData === null) {
  //     updateData();
  //   }

  //   console.log('updateData', registerData);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [registerData]);

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
                      openModal('저희 서비스는 만 14세 이상만 이용할 수 있습니다.');
                      onClose();
                      return false;
                    }
                    await uploadAndNavigate(file);
                    // console.log('확인');
                    onClose();
                    router.push('/my-profile'); // 페이지 이동을 수행합니다.
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
