'use client';

import React from 'react';
import { googleLogin } from '@/auth/google';

function GoogleLoginBtn() {
  return (
    <>
      <button type="button" onClick={googleLogin}>
        Google
      </button>
    </>
  );
}

export default GoogleLoginBtn;
