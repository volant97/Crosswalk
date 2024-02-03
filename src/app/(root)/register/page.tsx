'use client';

import Mbti from '@/components/register/mbti/Mbti';
import Interest from '@/components/register/interest/Interest';
import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Agreement from '@/components/register/input/Agreement';
import Name from '@/components/register/input/Name';
import React, { useEffect, useState } from 'react';
import UploadImg from '@/components/register/upload_image/UploadImg';
import Image from 'next/image';
import Indicator from '@/components/register/IndicatorScroll';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  return (
    <>
      {/* Header */}
      <div className="relative flex font-virgil h-[64px] sticky top-0 bg-white items-center justify-center border-b-[1px] border-[#E9EAEB] z-99">
        <Link href={'/'}>
          <div className="flex items-center justify-center w-full h-full pt-[5px] text-[3dvh] font-virgil font-[500]">
            Crosswalk
          </div>
        </Link>
        <Indicator />
      </div>
      {/* 가입 절차별 컴포넌트 */}
      <Agreement />
      <Name />
      <Mbti />
      <AgeAndHeight />
      <Interest />
      <UploadImg />
    </>
  );
}

export default RegisterPage;
