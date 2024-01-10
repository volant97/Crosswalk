'use client';

import React from 'react';
import { googleLogin } from '@/auth/google';

function GoogleLoginBtn() {
  return (
    <>
      <button type="button" onClick={googleLogin}>
        Google 로그인
      </button>
    </>
  );
}

export default GoogleLoginBtn;
