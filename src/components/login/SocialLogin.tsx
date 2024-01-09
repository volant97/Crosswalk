import KakaoLoginBtn from '@/components/login/kakao/KakaoLoginBtn';
import GoogleLoginBtn from './google/GoogleLoginBtn';

function SocialLogin() {
  return (
    <div>
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <div>네이버 or 애플</div>
    </div>
  );
}

export default SocialLogin;
