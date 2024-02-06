import React from 'react';
import Image from 'next/image';
import { kakaoLogin } from '@/auth/kakao';
import kakao from '@assets/login/kakao.png';

function KakaoLoginBtn() {
  return (
    <button className="relative w-[52px] h-[52px] rounded-full bg-[#FEE500]" type="button" onClick={kakaoLogin}>
      <Image src={kakao} alt="kakao" width={52} height={52} />
    </button>
  );
}

export default KakaoLoginBtn;
