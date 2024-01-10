'use client';

import { kakaoLogin } from '@/auth/kakao';
import React from 'react';

function KakaoLoginBtn() {
  return (
    <>
      <button type="button" onClick={kakaoLogin}>
        Kakao
      </button>
    </>
  );
}

export default KakaoLoginBtn;
