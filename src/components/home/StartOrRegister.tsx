'use client';

import React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import SocialLogin from './social_login/SocialLogin';
import { Button } from '@nextui-org/react';
import useLogoutAlertModal from '../common/modal/LogoutAlertModal';

function StartOrRegister() {
  const { openLogoutModal, LogoutAlertModal } = useLogoutAlertModal();
  const user = useRecoilValue(userState);

  const isProfileFilled =
    !!user?.profile?.age &&
    !!user?.profile?.avatar &&
    !!user?.profile?.gender &&
    !!user?.profile?.height &&
    !!user?.profile?.information_agreement &&
    !!user?.profile?.information_use_period &&
    user?.profile?.interest?.length !== 0 &&
    !!user?.profile?.mbti &&
    !!user?.profile?.name &&
    !!user?.profile?.uid &&
    !!user?.profile?.user_img;

  return user ? (
    isProfileFilled ? (
      <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
        <Link
          href={'/main'}
          className="flex justify-center items-center w-full h-full text-[18px] text-white font-semibold"
        >
          시작하기
        </Link>
      </Button>
    ) : (
      <div className="flex flex-col justify-between w-full h-[93px] ">
        <Button className="w-full h-[50px] bg-customGreen3 rounded-3xl cursor-pointer">
          <Link
            href={'/register'}
            className="flex justify-center items-center w-full h-full text-white text-[18px] leading-[20px] font-semibold "
          >
            등록하기
          </Link>
        </Button>
        <div className="flex justify-center gap-[5px]">
          <div
            className="flex justify-center w-[70px] h-[30px] cursor-pointer"
            onClick={() => {
              openLogoutModal('처음으로 돌아갑니다.');
            }}
          >
            <div className="flex justify-center items-center gap-[8px]">
              <p className="text-[16px] text-gray-AAA font-normal leading-[16px] ">처음으로</p>
            </div>
          </div>
          <Link href={'/customer-service/contact'} className="flex justify-center w-[70px] h-[30px] cursor-pointer">
            <div className="flex justify-center items-center gap-[8px]">
              <p className="text-[16px] text-gray-AAA font-normal leading-[16px]">문의하기</p>
            </div>
          </Link>
        </div>
        {LogoutAlertModal()}
      </div>
    )
  ) : (
    <SocialLogin />
  );
}

export default StartOrRegister;
