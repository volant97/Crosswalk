// 'use client';

import { kakaoLogin, kakaoLogout } from '@/auth/kakao';
import React from 'react';

function KakaoLoginBtn() {
  return (
    <>
      <button type="submit" onClick={kakaoLogin}>
        Kakao 로그인
      </button>
      <button type="button" onClick={kakaoLogout}>
        Kakao 로그아웃
      </button>
    </>
  );
}

export default KakaoLoginBtn;
