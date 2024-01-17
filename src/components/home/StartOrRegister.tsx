'use client';

import React from 'react';
import SocialLogin from './social_login/SocialLogin';
import { useRecoilState } from 'recoil';
import { IsLoginType } from '@/types/isLoginType';
import { isUserState } from '@/recoil/auth';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';

function StartOrRegister() {
  const [user, setUser] = useRecoilState(userState);

  return user ? (
    user.profile ? (
      <Button className="w-full h-full bg-customGreen rounded-3xl cursor-pointer">
        <Link href={'/main'} className="flex justify-center items-center w-full h-full">
          시작하기
        </Link>
      </Button>
    ) : (
      <Button className="w-full h-full bg-customYellow rounded-3xl cursor-pointer">
        <Link href={'/register'} className="flex justify-center items-center w-full h-full">
          등록하기
        </Link>
      </Button>
    )
  ) : (
    <SocialLogin />
  );
}

export default StartOrRegister;
