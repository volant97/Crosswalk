import KakaoLoginBtn from '@/components/login/kakao/KakaoLoginBtn';
import GoogleLoginBtn from '../google/GoogleLoginBtn';
import Logout from '../../common/Logout';
import AppleLoginBtn from '../apple/AppleLoginBtn';

function SocialLogin() {
  return (
    <div className="flex justify-center">
      <GoogleLoginBtn />
      <KakaoLoginBtn />
      <AppleLoginBtn />
    </div>
  );
}

export default SocialLogin;
