'use client';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import Image from 'next/image';
import React, { FormEventHandler, use, useEffect, useState } from 'react';
import { PiPlusThin } from 'react-icons/pi';
import { Button } from '@nextui-org/react';
import { LuPencil } from 'react-icons/lu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { registerState } from '@/recoil/register';
import { TfiReload } from 'react-icons/tfi';
import MbtiModal from '../common/modal/MbtiModal';
import InterestModal from '../common/modal/InterestModal';
import { isUserState } from '@/recoil/auth';

function EditMyProfile() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const myInfo = registerData;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openMbtiModal, mbtiModal } = MbtiModal();
  const { openInterestModal, interestModal } = InterestModal();
  const [gender, setGender] = useState<string | null>(myInfo?.gender);
  const [name, setName] = useState<string | null>(myInfo?.name);
  const [age, setAge] = useState<number | null>(myInfo?.age);
  const [height, setHeight] = useState<number | null>(myInfo?.height);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const heightHandler = (e: any) => {
    setHeight(e.target.value);
  };

  const ageHandler = (e: any) => {
    setAge(e.target.value);
  };

  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];
    if (imgFile) {
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    }
  };

  const onSubmitHandelr = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (registerData == null) return;

  return (
    <div className=" overflow-hidden ">
      <div className="flex justify-center filxed relative z-10">
        <div className="h-[6.25rem] w-[6.25rem]">
          <Image
            className="rounded-full"
            src={`/assets/avatar/avatar${myInfo.avatar}.jpg`}
            width={200}
            height={200}
            alt="my avatar"
          />
        </div>
        <div className="absolute top-[1px]">
          <button
            onClick={() => {
              setRegisterData((prevData) => ({
                ...prevData,
                avatar: Math.floor(Math.random() * 10)
              }));
            }}
            className="flex items-center justify-center capitalize w-[2rem] h-[2rem] bg-white rounded-full ml-[80px]"
          >
            <TfiReload size={15} />
          </button>
        </div>
        {/* <ChooseAvatarModal /> */}
      </div>
      <div className=" mt-[-30px] h-[30rem] overflow-y-auto scrollbar-hide rounded-[1.5rem]">
        <div className=" flex flex-col h-[54.8rem]  rounded-[1.5rem]  px-[1.25rem] bg-customGreen2">
          <form onSubmit={onSubmitHandelr}>
            <div className="flex flex-col mt-[2.75rem] mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">이름</label>
              <input
                value={name || undefined}
                onChange={nameHandler}
                type="text"
                name="name"
                id="id"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div>
            <div className="mb-[1.5rem]">
              <p className="text-[1.125rem] mb-[0.5rem] font-semibold">성별</p>
              <Button
                value={gender || undefined}
                type="button"
                className={`w-[45%] mr-[0.5rem] py-2 px-6 bg-white rounded-full cursor-pointer border ${
                  gender === 'M' ? 'border-2 font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
                }`}
                onClick={() => {
                  setGender('M');
                }}
              >
                남자
              </Button>
              <Button
                value={gender || undefined}
                type="button"
                className={`w-[45%] py-2 px-6 bg-white rounded-full cursor-pointer border ${
                  gender === 'F' ? 'border-2 font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
                }`}
                onClick={() => {
                  setGender('F');
                }}
              >
                여자
              </Button>
            </div>
            <div className="relative flex flex-col flex-wrap mb-[1.5rem]">
              <p className="font-semibold mb-[0.5rem]">MBTI</p>
              <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] rounded-full">
                {myInfo.mbti}
              </div>
              <div
                onClick={() => {
                  openMbtiModal();
                }}
                className="absolute left-[55px] top-[40px] flex items-center justify-center capitalize w-[1.875rem] h-[1.875rem] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
              >
                <LuPencil size={13} />
              </div>
            </div>
            <div className="flex flex-col  mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">나이</label>
              <input
                value={String(age) || undefined}
                onChange={ageHandler}
                type="number"
                name="age"
                id="age"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col  mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">키</label>
              <input
                value={height || undefined}
                onChange={heightHandler}
                type="number"
                name="height"
                id="height"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div>
            <div className="relative flex flex-col flex-wrap mb-[1.5rem]">
              <p className="font-semibold mb-[0.5rem]">관심사</p>
              <div className="flex flex-row gap-[0.38rem]">
                <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] rounded-full text-xs font-semibold">
                  {myInfo.interest?.[0]}
                </div>
                <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] text-xs rounded-full font-semibold">
                  {myInfo.interest?.[1]}
                </div>
                <div className=" flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] text-xs rounded-full font-semibold">
                  {myInfo.interest?.[2]}
                </div>
                <div
                  onClick={() => {
                    openInterestModal();
                  }}
                  className="absolute right-[40px] top-[40px] flex items-center justify-center capitalize w-[1.875rem] h-[1.875rem] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
                >
                  <LuPencil size={13} />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col mb-[1.5rem]">
              <p className="font-semibold mb-[0.5rem]">사진</p>

              {selectedImg === '' ? (
                <div className="w-[7.5rem] h-[10.25rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[1rem]">
                  <PiPlusThin size={50} className="fill-gray-E6" />
                </div>
              ) : (
                <div className="">
                  <Image
                    className="w-[7.5rem] h-[10.25rem] rounded-[1rem] object-cover"
                    src={selectedImg}
                    alt="업로드이미지"
                    width={50}
                    height={50}
                  />
                </div>
              )}
              <label htmlFor="usersImg">
                <input type="file" accept="image/*" id="usersImg" onChange={previewImg} className="hidden" />
                <div className="absolute left-[105px] bottom-[-10px] flex items-center justify-center capitalize w-[1.875rem] h-[1.875rem] bg-lightGreen rounded-full cursor-pointer hover:scale-110">
                  <LuPencil size={13} />
                </div>
              </label>
            </div>

            <ConfirmModal name={name} age={age} height={height} gender={gender} file={file} selectedImg={selectedImg} />
          </form>
        </div>
      </div>
      {mbtiModal()}
      {interestModal()}
    </div>
  );
}

export default EditMyProfile;
