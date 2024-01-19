import Image from 'next/image';
import React from 'react';
import FlirtingModal from '../common/modal/FlirtingModal';
import Button from '../Button';
import { IoClose } from 'react-icons/io5';
import { GoHeartFill } from 'react-icons/go';

const tags = ['음악', '여행', '맛집'];

const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

type Props = {
  age: number;
  avatar: string;
  name: string;
  interest: string[];
  height: number;
  gender: string;
  mbti: string;
  nextCardBtn: () => void;
};

function ProfileCard({ age, avatar, name, interest, height, gender, mbti, nextCardBtn }: Props) {
  return (
    <div>
      <div className="relative">
        <div className="relative w-full aspect-[2/3]">
          <Image
            className="rounded-t-[1.5rem]"
            src={`/assets/avatar/avatar${avatar}.png`}
            alt="유저 아바타 이미지"
            fill
          />
        </div>
        <div className="flex items-start w-[895px] h-[24px] gap-[4px] absolute bottom-[46px] px-[20px] mb-[10px]">
          <h1 className="text-[24px] font-bold w-full h-[24px] leading-[24px]">{name}</h1>
          <h2 className="w-[18px] h-[16px] text-[16px] absolute bottom-0 left-[68px] mb-[2px] ml-[1px] leading-[16px] pt-[1px] font-medium">
            {age}
          </h2>
        </div>
        <div className="flex flex-warp w-full items-center gap-[4px] absolute bottom-[24px] ml-[20px]">
          {interest?.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex items-center justify-center text-center border-[1px] border-solid border-white px-[4px] py-[10px] text-white  rounded-[1rem] text-[13px] font-medium h-[20px] w-[43px]"
                >
                  {item}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col  h-[11.5rem] w-full rounded-b-[1.5rem] bg-customGreen2  px-[1.25rem]">
        <div className="flex flex-col gap-[8px] my-[1.5rem] h-[52px]">
          <h1 className="text-[18px] leading-[18px] font-medium ">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px]">
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {height}cm
            </div>
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px]  rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {gender === 'M' ? '남자' : '여자'}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[52px] ">
          <h1 className="text-[18px] leading-[18px] font-medium">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px] mt-[0.5rem] ">
            <div
              className={`${border} flex justify-center items-center px-[12px] py-[4px]  text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {mbti}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3  justify-between w-full">
        <Button onClick={() => {}} color="default" size="md">
          <IoClose size={20} /> 괜찮아요
        </Button>
        <Button onClick={() => {}} color="green" size="md">
          <Image src="/assets/button/heart.png" width={20} height={20} alt="heart" />
          <span className="text-black text-[18px] leading-[20px] font-semibold">어필하기</span>
        </Button>
      </div>
    </div>
  );
}

export default ProfileCard;
