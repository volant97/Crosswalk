import Image from 'next/image';
import React, { Fragment } from 'react';
import { Button } from '@nextui-org/react';
import { logout } from '@/auth/auth';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import type { IsLoginType } from '@/types/isLoginType';
import { useRouter } from 'next/navigation';

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
};

function MyCard({ age, avatar, name, interest, height, gender, mbti }: Props) {
  const router = useRouter();
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);
  return (
    <div className="relative">
      <div className="relative w-full aspect-[2/3]">
        <Image
          className="rounded-t-[1.5rem]"
          src={`/assets/avatar/avatar${avatar}.png`}
          alt="유저 아바타 이미지"
          fill
        />
      </div>
      <div className="flex items-center w-full h-[24px] absolute bottom-[293px] px-[20px] mb-[10px] gap-[5px]">
        <h1 className="text-[24px] font-bold leading-[24px]">{name}</h1>
        <h2 className="h-[16px] text-[16px] absolute bottom-0 left-[88px] mb-[2px] ml-[1px] leading-[16px] pt-[1px] font-medium">
          {age}
        </h2>
      </div>
      <div className="flex flex-warp w-full h-[24px] gap-[4px] absolute bottom-[273px] ml-[20px]">
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
      <div className="flex justify-between gap-[8px] w-full">
        <Button
          color="default"
          onClick={() => {
            logout();
            setUserState({
              uid: null,
              isLogin: false
            });
            router.push('/');
          }}
          className={`w-[177px] h-[50px] px-[1.25rem] mr-[0.75rem] text-[1rem] font-semibold rounded-3xl cursor-pointer mb-[0.75rem]  mt-[1.2rem] `}
          size="md"
        >
          <span className="text-gray-AAA text-[18px] leading-[20px] font-semibold">로그아웃</span>
        </Button>
        <Button
          onClick={() => {
            router.push('/my-profile/edit');
          }}
          className={`w-[177px] h-[50px] px-[1.25rem] text-[1rem] font-semibold rounded-3xl cursor-pointer mt-[1.2rem] mb-[0.75rem] bg-customGreen`}
          size="md"
        >
          <span className="text-black text-[18px] leading-[20px] font-semibold">프로필 수정</span>
        </Button>
      </div>
    </div>
  );
}

export default MyCard;
