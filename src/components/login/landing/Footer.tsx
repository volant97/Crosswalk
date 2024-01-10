'use client';

import React from 'react';
import SocialLogin from './SocialLogin';
import { useRecoilState } from 'recoil';
import { IsLoginType } from '@/types/isLoginType';
import { isUserState } from '@/recoil/auth';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

function Footer() {
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);

  return (
    <div>
      {userState.isLogin ? (
        <Button className="w-full bg-customGreen rounded-3xl cursor-pointer mb-10">
          <Link href={'/main'} className="w-full p-2">
            시작하기
          </Link>
        </Button>
      ) : (
        <SocialLogin />
      )}
    </div>
  );
}

export default Footer;
