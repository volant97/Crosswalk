'use client';

import React from 'react';
import { GoogleLogOut, GoogleLogin } from '@/auth/google';

function GoogleLoginBtn() {
  return (
    <>
      <button type="button" onClick={GoogleLogin}>
        Google 로그인
      </button>
      <button type="button" onClick={GoogleLogOut}>
        Google 로그아웃
      </button>
    </>
  );
}

export default GoogleLoginBtn;
