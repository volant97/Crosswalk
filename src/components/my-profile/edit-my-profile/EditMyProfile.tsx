'use client';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import MbtiModal from '../../common/modal/MbtiModal';
import InterestModal from '../../common/modal/InterestModal';
import { userState } from '@/recoil/user';
import useAlertModal from '@/components/common/modal/AlertModal';
import useForm from '@/hooks/useForm';
import { RegisterType } from '@/types/registerType';
import InputAvatar from './InputAvatar';
import InputName from './InputName';
import InputGender from './InputGender';
import InputMbti from './InputMbti';
import InputAge from './InputAge';
import InputHeight from './InputHeight';
import InputInterest from './InputInterest';
import InputImage from './InputImage';

const MAN_NUMBER = [1, 3, 5, 7, 9, 11, 13, 15];
const WOMAN_NUMBER = [2, 4, 6, 8, 10, 12, 14, 16];

function EditMyProfile() {
  const registerData = useRecoilValue(userState);
  const myInfo: RegisterType | null | undefined = registerData?.profile;

  const [selectedImg, setSelectedImg] = useState<string>(myInfo?.user_img || '');
  const [file, setFile] = useState<any>('test');
  const [avatar, setAvatar] = useState<number>(myInfo?.avatar || 0);

  const { formState, onChangeHandler } = useForm({
    gender: myInfo?.gender || '',
    name: myInfo?.name || '',
    age: myInfo?.age || 0,
    height: myInfo?.height || 0
  });
  const { gender, name, age, height } = formState;

  const { openMbtiModal, mbtiModal } = MbtiModal();
  const { openInterestModal, interestModal } = InterestModal();
  const { openModal, AlertModal } = useAlertModal();

  const previewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target?.files?.[0];
    if (!imgFile) return false;
    if (imgFile.size > 1024 * 1024 * 5) {
      openModal('사진은 5MB 이하로 부탁드립니다.');
      return false;
    }
    if (imgFile) {
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    } else {
      setFile(myInfo?.user_img || null);
      setSelectedImg(myInfo?.user_img || '');
    }
  };

  const onSubmitHandelr = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updateGender = (gender: string) => {
    const avatarNumbers = gender === 'M' ? MAN_NUMBER : WOMAN_NUMBER;
    const randomIndex = Math.floor(Math.random() * avatarNumbers.length);
    setAvatar(avatarNumbers[randomIndex]);
    return avatarNumbers[randomIndex];
  };

  useEffect(() => {
    if (!avatar) setAvatar(0);
  }, [avatar]);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <form
        className="flex flex-col gap-[20px] w-[320px] py-[25px] overflow-y-auto scrollbar-hide"
        onSubmit={onSubmitHandelr}
      >
        <div className="relative flex flex-col items-center gap-[24px] w-full mt-[90px] px-[20px] pt-[44px] pb-[30px] bg-melona rounded-[24px]">
          <InputAvatar updateGender={updateGender} avatar={avatar} gender={myInfo?.gender || ''} />
          <InputName name={name} onChangeHandler={onChangeHandler} />
          <InputGender gender={gender} />
          <InputMbti mbti={myInfo?.mbti || ''} openMbtiModal={openMbtiModal} />
          <InputAge age={age?.toString()} onChangeHandler={onChangeHandler} />
          <InputHeight height={height?.toString()} onChangeHandler={onChangeHandler} />
          <InputInterest
            interest={myInfo?.interest?.[0]}
            interest1={myInfo?.interest?.[1]}
            interest2={myInfo?.interest?.[2]}
            openInterestModal={openInterestModal}
          />
          <InputImage selectedImg={selectedImg} previewImg={previewImg} />
        </div>
        <div>
          <ConfirmModal name={name} age={age} height={height} file={file} selectedImg={selectedImg} avatar={avatar} />
        </div>
      </form>
      {mbtiModal()}
      {interestModal()}
      {AlertModal()}
    </div>
  );
}

export default EditMyProfile;
