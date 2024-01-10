import KakaoLoginBtn from '@/components/login/kakao/KakaoLoginBtn';
import GoogleLoginBtn from './google/GoogleLoginBtn';
import Logout from '../common/Logout';

function SocialLogin() {
  return (
    <div>
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <div>네이버 or 애플</div>
      <Logout />
    </div>
  );
}

export default SocialLogin;
