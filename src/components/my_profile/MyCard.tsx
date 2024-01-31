import Image from 'next/image';
import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useLogoutAlertModal from '../common/modal/LogoutAlertModal';
import { userState } from '@/recoil/user';

type Props = {
  age: number;
  avatar: string;
  name: string;
  interest: string[];
  height: number;
  gender: string;
  mbti: string;
};

const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

function MyCard({ age, avatar, name, interest, height, gender, mbti }: Props) {
  const router = useRouter();
  const { openLogoutModal, LogoutAlertModal } = useLogoutAlertModal();
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className="relative">
      <div className="relative">
        <div className="relative">
          <div className="relative w-full aspect-[2/3]">
            <Image
              className="rounded-t-[1.5rem]"
              src={`/assets/avatar/avatar${avatar}.png`}
              alt="유저 아바타 이미지"
              fill
            />
            <Link
              href="./my-profile/edit"
              className="w-[32px] h-[32px] flex justify-center items-center gap-[10px] rounded-[30px] bg-white bg-opacity-80 absolute right-[12px] top-[12px]"
            >
              <Image src="/assets/figmaImg/logout_pen.png" width={16} height={16} alt="edit my profile" className="" />
            </Link>
          </div>
          <div className="absolute flex flex-col gap-[10px] bottom-[27px] left-[20px]">
            <div className="flex items-end w-full gap-[4px]">
              <h1 className="text-[24px] font-bold leading-[24px]">{name}</h1>
              <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium">{age}</h2>
            </div>
            <div className="flex flex-warp w-full items-center gap-[4px] ">
              {interest?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      key={index}
                      className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px]  bg-gray-800 bg-opacity-10"
                    >
                      {item}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] w-full bg-customGreen2  px-[20px] py-[24px]">
        <div className="flex flex-col gap-[8px]  h-[52px]">
          <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem]">
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {height}cm
            </div>
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {gender === 'M' ? '남자' : '여자'}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[52px] ">
          <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] mt-[0.5rem] ">
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {mbti}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col py-[12px] px-[20px] items-center gap-[24px]  w-full h-[40px] bg-[#F7F7F7] rounded-b-[1.5rem] cursor-pointer"
        onClick={() => {
          openLogoutModal('로그아웃 되었습니다.');
        }}
      >
        <div className="flex justify-center items-center gap-[8px]">
          <p className="text-[16px] text-gray-888 font-normal leading-[16px] ">로그아웃</p>
          <Image src="/assets/figmaImg/logout_icon.png" height={16} width={16} alt="log out" />
        </div>
      </div>
      {LogoutAlertModal()}
    </div>
  );
}

export default MyCard;
