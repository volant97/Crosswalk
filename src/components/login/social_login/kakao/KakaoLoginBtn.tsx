'use client';

import { kakaoLogin } from '@/auth/kakao';
import React from 'react';

function KakaoLoginBtn() {
  return (
    <>
      <button className="w-[3.25rem] h-[3.25rem] rounded-full bg-[#FEE500]" type="button" onClick={kakaoLogin}>
        K
      </button>
    </>
  );
}

export default KakaoLoginBtn;
