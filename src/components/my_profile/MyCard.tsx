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
    <>
      <div className="relative">
        <div className="relative w-full aspect-[2/3]">
          <Image
            className="rounded-t-[1.5rem]"
            src={`/assets/avatar/avatar${avatar}.png`}
            alt="유저 아바타 이미지"
            fill
          />
        </div>
        <div className="flex items-center gap-[5px] absolute bottom-[3.75rem] px-[1.4rem]">
          <h1 className="text-[1.375rem] font-semibold">{name}</h1>
          <h2 className="font-medium">{age}</h2>
        </div>
        <div className="flex flex-warp w-full items-center gap-[5px] absolute bottom-[1.8rem] px-[1.4rem]">
          {interest?.map((item, index) => {
            return (
              <Fragment key={index}>
                <div
                  key={index}
                  className="border-[2px] border-solid border-white px-[0.63rem] py-[0.25rem] text-white bg-slate-300/50 rounded-[1rem] text-[0.8125rem] font-semibold"
                >
                  {item}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col h-[11.5rem] w-full rounded-b-[1.5rem] bg-customGreen2  px-[1.25rem]">
        <div className="mb-[1.5rem] my-[1.5rem] h-[2.875rem]">
          <h1 className="text-gray-999">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem]">
            <div className={`${border}`}>{height}cm</div>
            <div className={`${border}`}>{gender === 'M' ? '남자' : '여자'}</div>
          </div>
        </div>
        <div className="h-[2.875rem] mb-[1.5rem]">
          <h1 className="text-slate-400">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] mt-[0.5rem]">
            <div className={`${border}`}>{mbti}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
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
          className={`w-[9.625rem] h-[3.125rem] px-[1.25rem] mr-[0.75rem] text-[1rem] font-semibold rounded-3xl cursor-pointer mb-[0.75rem] text-gray-AAA mt-[1.2rem] `}
        >
          로그아웃
        </Button>
        <Button
          onClick={() => {
            router.push('/my-profile/edit');
          }}
          className={`w-[9.625rem] px-[1.25rem] h-[3.125rem] text-[1rem] font-semibold rounded-3xl cursor-pointer mt-[1.2rem] mb-[0.75rem] bg-customGreen`}
        >
          프로필 수정
        </Button>
      </div>
    </>
  );
}

export default MyCard;
