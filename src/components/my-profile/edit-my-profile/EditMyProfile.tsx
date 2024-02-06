'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { PiPlusThin } from 'react-icons/pi';
import { LuPencil } from 'react-icons/lu';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import useAlertModal from '@/components/common/modal/AlertModal';
import MbtiModal from '../../common/modal/MbtiModal';
import InterestModal from '../../common/modal/InterestModal';
import useForm from '@/hooks/useForm';

const MAN_NUMBER = [1, 3, 5, 7, 9, 11, 13, 15];
const WOMAN_NUMBER = [2, 4, 6, 8, 10, 12, 14, 16];

function EditMyProfile() {
  const registerData = useRecoilValue(userState);
  const myInfo: any = registerData?.profile;

  const [selectedImg, setSelectedImg] = useState<string>(myInfo?.user_img);
  const [file, setFile] = useState<any>('test');
  const [avatar, setAvatar] = useState<number>(myInfo?.avatar);

  const { formState, onChangeHandler } = useForm({
    gender: myInfo?.gender,
    name: myInfo?.name,
    age: myInfo?.age,
    height: myInfo?.height
  });
  const { gender, name, age, height } = formState;

  const { openMbtiModal, mbtiModal } = MbtiModal();
  const { openInterestModal, interestModal } = InterestModal();
  const { openModal, AlertModal } = useAlertModal();

  const previewImg = (event: any) => {
    const imgFile = event.target?.files[0];
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
      setSelectedImg(myInfo?.user_img || null);
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
          {/* 아바타 */}
          <div className="absolute top-[-70px] flex justify-center items-center h-[100px] w-[100px] z-2">
            <div className="relative h-[100px] w-[100px] bg-gray-EF rounded-full">
              <Image
                className="h-[100px] w-[100px] rounded-full object-cover"
                src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`}
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <div className="absolute top-[1px]">
              <button
                onClick={() => {
                  updateGender(myInfo?.gender);
                }}
                className="flex items-center justify-center capitalize w-[32px] h-[32px] bg-white rounded-full ml-[80px]"
              >
                <Image
                  src="/assets/figmaImg/Refresh.png"
                  className="w-[20px] h-[20px]"
                  width={100}
                  height={100}
                  alt="avatar_changer"
                />
              </button>
            </div>
          </div>
          {/* 이름 */}
          <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>이름</label>
            <input
              className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize placeholder:text-[#888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={name}
              onChange={onChangeHandler}
              type="text"
              name="name"
              id="id"
              autoComplete="off"
              placeholder={'홍길동'}
            />
          </div>
          {/* 성별 */}
          <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>성별</label>
            <div className="flex justify-start gap-[8px] w-full">
              <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize text-gray-500 bg-gray-200 border-1 border-solid border-gray-300 rounded-full">
                {gender === 'M' ? '남자' : '여자'}
              </div>
            </div>
          </div>
          {/* MBTI */}
          <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <p className="font-semibold mb-[0.5rem]">MBTI</p>
            <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize bg-white border-1 border-solid border-black rounded-full">
              {myInfo?.mbti}
              <div
                onClick={() => {
                  openMbtiModal();
                }}
                className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
              >
                <LuPencil size={16} />
              </div>
            </div>
          </div>
          {/* 나이 */}
          <div className="relative flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>나이</label>
            <input
              className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize appearance-none placeholder:text-[#888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={age?.toString()}
              onChange={onChangeHandler}
              type="number"
              name="age"
              id="age"
              autoComplete="off"
              placeholder={'27세'}
            />
            <p className="absolute right-[20px] bottom-[8px] text-[16px] font-[200] text-gray-999">세</p>
          </div>
          {/* 키 */}
          <div className="relative flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>키</label>
            <input
              className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize appearance-none placeholder:text-[#888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={height?.toString()}
              onChange={onChangeHandler}
              type="number"
              name="height"
              id="height"
              autoComplete="off"
              placeholder={'180cm'}
            ></input>
            <p className="absolute right-[20px] bottom-[8px] text-[16px] font-[200] text-gray-999">cm</p>
          </div>
          {/* 관심사 */}
          <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>관심사</label>
            <div className="flex justify-start items-start gap-[6px] flex-wrap self-stretch">
              <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
                {myInfo?.interest?.[0]}
              </div>
              <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
                {myInfo?.interest?.[1]}
              </div>
              <div className="relative flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
                {myInfo?.interest?.[2]}
                <div
                  onClick={() => {
                    openInterestModal();
                  }}
                  className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
                >
                  <LuPencil size={16} />
                </div>
              </div>
            </div>
          </div>
          {/* 사진 */}
          <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
            <label>사진</label>
            <label className="relative cursor-pointer" htmlFor="usersImg">
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/heic"
                id="usersImg"
                onChange={previewImg}
                className="hidden"
              />
              {selectedImg === '' ? (
                // Todo : 어떤 경우에 나오는지 확인 못함. CSS 작업 필요
                <div className="w-[7.5rem] h-[10.25rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[1rem]">
                  <PiPlusThin size={50} className="fill-gray-E6" />
                </div>
              ) : (
                <div className="relative w-[120px] h-[164px] ">
                  <Image className="rounded-[11.364px] object-cover" src={selectedImg} alt="user_img" fill />
                </div>
              )}
              <div className="absolute bottom-[-10px] left-[100px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110">
                <LuPencil size={16} />
              </div>
            </label>
          </div>
        </div>
        {/* 수정하기 버튼 */}
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
