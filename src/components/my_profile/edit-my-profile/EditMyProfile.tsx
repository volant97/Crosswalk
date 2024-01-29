'use client';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import Image from 'next/image';
import React, { useState } from 'react';
import { PiPlusThin } from 'react-icons/pi';
import { LuPencil } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import MbtiModal from '../../common/modal/MbtiModal';
import InterestModal from '../../common/modal/InterestModal';
import { userState } from '@/recoil/user';

function EditMyProfile() {
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myInfo: any = registerData?.profile;
  const [selectedImg, setSelectedImg] = useState<any | null>(myInfo?.user_img);
  const [file, setFile] = useState<any | null>('test');
  const { openMbtiModal, mbtiModal } = MbtiModal();
  const { openInterestModal, interestModal } = InterestModal();
  const [gender, setGender] = useState<string | undefined>(myInfo?.gender || undefined);
  const [name, setName] = useState<string | undefined>(myInfo?.name || undefined);
  const [age, setAge] = useState<number | string | undefined>(myInfo?.age || undefined);
  const [height, setHeight] = useState<number | string | undefined>(myInfo?.height || undefined);
  const [avatar, setAvatar] = useState<number | undefined>(myInfo?.avatar || undefined);
  // console.log(myInfo);

  const manNumber = [1, 3, 5, 7, 9, 11, 13, 15];
  const womanNumber = [2, 4, 6, 8, 10, 12, 14];

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const heightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const ageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];
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
    const avatarNumbers = gender === 'M' ? manNumber : womanNumber;
    const randomIndex = Math.floor(Math.random() * avatarNumbers.length);
    setAvatar(avatarNumbers[randomIndex]);
    return avatarNumbers[randomIndex];
  };

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
              onChange={nameHandler}
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
              onChange={ageHandler}
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
              onChange={heightHandler}
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
              <input type="file" accept="image/*" id="usersImg" onChange={previewImg} className="hidden" />
              {selectedImg === '' ? (
                // 어떤 경우에 나오는지 확인 못함. CSS 작업 필요
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
    </div>
  );
}

export default EditMyProfile;

{
  /* <div className=" mt-[-30px] h-[30rem] overflow-y-auto scrollbar-hide rounded-[1.5rem]">
        <div className=" flex flex-col h-[54.8rem]  rounded-[1.5rem]  px-[1.25rem] bg-customGreen2">
          <form onSubmit={onSubmitHandelr}> */
}
{
  /* <div className="flex flex-col mt-[2.75rem] mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">이름</label>
              <input
                value={name}
                onChange={nameHandler}
                type="text"
                name="name"
                id="id"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div> */
}
{
  /* <div className="mb-[1.5rem]">
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
            </div> */
}
{
  /* <div className="relative flex flex-col flex-wrap mb-[1.5rem]">
              <p className="font-semibold mb-[0.5rem]">MBTI</p>
              <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] rounded-full">
                {myInfo?.mbti}
              </div>
              <div
                onClick={() => {
                  openMbtiModal();
                }}
                className="absolute left-[55px] top-[40px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
              >
                <LuPencil size={13} />
              </div>
            </div> */
}
{
  /* <div className="flex flex-col  mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">나이</label>
              <input
                value={String(age)}
                onChange={ageHandler}
                type="text"
                name="age"
                id="age"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div> */
}
{
  /* <div className="flex flex-col  mb-[1.5rem] ">
              <label className="text-[1.125rem] mb-[0.5rem] font-semibold">키</label>
              <input
                value={String(height)}
                onChange={heightHandler}
                type="text"
                name="height"
                id="height"
                className="border-1 px-[1.25rem] py-[0.5rem] rounded-[3.13rem] border-gray-DDD"
                autoComplete="off"
              />
            </div> */
}
{
  /* <div className="relative flex flex-col flex-wrap mb-[1.5rem]">
              <p className="font-semibold mb-[0.5rem]">관심사</p>
              <div className="flex flex-row gap-[0.38rem]">
                <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] rounded-full text-xs font-semibold">
                  {myInfo?.interest?.[0]}
                </div>
                <div className="flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] text-xs rounded-full font-semibold">
                  {myInfo?.interest?.[1]}
                </div>
                <div className=" flex justify-center items-center border-2 border-solid border-black w-[4.375rem] h-[2.5rem] text-xs rounded-full font-semibold">
                  {myInfo?.interest?.[2]}
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
            </div> */
}
{
  /* <div className="relative flex flex-col mb-[1.5rem]">
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
                    width={300}
                    height={300}
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
            </div> */
}

{
  /* <ConfirmModal name={name} age={age} height={height} gender={gender} file={file} selectedImg={selectedImg} />
          </form> */
}
{
  /* </div> */
}
{
  /* </div> */
}
