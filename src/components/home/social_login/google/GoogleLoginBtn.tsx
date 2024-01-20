import React from 'react';
import { googleLogin } from '@/auth/google';
import google from '@assets/login/google.png';
import Image from 'next/image';

function GoogleLoginBtn() {
  return (
    <>
      <button className="relative w-[52px] h-[52px] rounded-full bg-[#FF1400]" type="button" onClick={googleLogin}>
        <Image src={google} alt="google" width={52} height={52} />
      </button>
    </>
  );
}

export default GoogleLoginBtn;
