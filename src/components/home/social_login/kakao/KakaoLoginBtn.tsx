import React from 'react';
import { kakaoLogin } from '@/auth/kakao';
import kakao from '@assets/login/kakao.png';
import Image from 'next/image';

function KakaoLoginBtn() {
  return (
    <>
      <button className="relative w-[52px] h-[52px] rounded-full bg-[#FEE500]" type="button" onClick={kakaoLogin}>
        <Image src={kakao} alt="kakao" fill />
      </button>
    </>
  );
}

export default KakaoLoginBtn;
