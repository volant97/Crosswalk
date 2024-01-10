'use client';

import React from 'react';
import { googleLogin } from '@/auth/google';

function GoogleLoginBtn() {
  return (
    <>
      <button className="w-[3.25rem] h-[3.25rem] rounded-full bg-[#FF1400]" type="button" onClick={googleLogin}>
        G
      </button>
    </>
  );
}

export default GoogleLoginBtn;
