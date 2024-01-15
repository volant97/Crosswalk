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

// MEMO: form 태그 안에 input 을 다 넣어서
// input 입력이 모두 완료된 후 한꺼번에 form의 onSubmit 이벤트 함수로
// supabase 데이터 update하는 방향으로 설계함

function EditMyProfile() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const myInfo = registerData;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openMbtiModal, mbtiModal } = MbtiModal();
  const { openInterestModal, interestModal } = InterestModal();
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const heightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const ageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  // 유효성 검사 및 supabase 데이터 update 로직 부분(하단)
  // const modifiedCustomUser = {
  //   id: uuid,
  //   createdAt: getDate(),
  //   email,
  //   gender,
  //   imgPath: imgPath,
  //   isDone: false,
  //   password,
  //   title,
  //   content,
  //   imgFileName,
  // };

  //  // 유효성 검사
  //  if (
  //   !cost ||
  //   !gender ||
  //   !togetherNum ||
  //   !email ||
  //   !password ||
  //   !imgPath ||
  //   !title ||
  //   !content
  // ) {
  //   return handleOpenAlert('입력하지 않은 곳이 있습니다.');
  // } else if (
  //   checkValidation('월세', cost, 6) &&
  //   checkValidation('모집인원 수', togetherNum, 3) &&
  //   checkEmailValidation(email) &&
  //   checkValidation('비밀번호', password, 10) &&
  //   checkValidation('제목', title, 30) &&
  //   checkValidation('내용', content, 500)
  // ) {
  //   if (await handleOpenModal('새 투게더를 등록하시겠습니까?')) {
  //     Mutation.mutate(newTogether);
  //   }
  // }

  const onSubmitHandelr = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                value={name}
                onChange={nameHandler}
                type="text"
                name="name"
                id="id"
                placeholder={myInfo.name || undefined}
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
              />
            </div>
            <div className="mb-[1.5rem]">
              <p className="text-[1.125rem] mb-[0.5rem] font-semibold">성별</p>
              <Button
                value={gender}
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
                value={gender}
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
                value={age}
                onChange={ageHandler}
                type="number"
                name="age"
                id="age"
                placeholder={String(myInfo.age) || undefined}
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
              />
            </div>
            <div className="flex flex-col  mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">키</label>
              <input
                value={height}
                onChange={heightHandler}
                type="text"
                name="height"
                id="height"
                placeholder={String(myInfo.height) || undefined}
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
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
