'use client';

import React from 'react';
import SocialLogin from './social_login/SocialLogin';
import { useRecoilState } from 'recoil';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { userState } from '@/recoil/user';

function StartOrRegister() {
  const [user, setUser] = useRecoilState(userState);

  return user ? (
    user.profile?.information_agreement ? (
      <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
        <Link
          href={'/main'}
          className="flex justify-center items-center w-full h-full text-[18px] text-white font-semibold"
        >
          시작하기
        </Link>
      </Button>
    ) : (
      <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
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
