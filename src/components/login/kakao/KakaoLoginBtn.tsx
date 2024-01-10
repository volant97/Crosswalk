'use client';

import { kakaoLogin } from '@/auth/kakao';
import React from 'react';

function KakaoLoginBtn() {
  return (
    <>
      <button type="button" onClick={kakaoLogin}>
        Kakao 로그인
      </button>
    </>
  );
}

export default KakaoLoginBtn;
