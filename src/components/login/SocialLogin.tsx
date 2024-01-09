'use client';

import KakaoLoginBtn from '@/components/login/kakao/KakaoLoginBtn';

function SocialLogin() {
  return (
    <div>
      <div>구글</div>
      <KakaoLoginBtn />
      <div>네이버 or 애플</div>
    </div>
  );
}

export default SocialLogin;
