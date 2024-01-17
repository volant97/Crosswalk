import KakaoLoginBtn from './kakao/KakaoLoginBtn';
import GoogleLoginBtn from './google/GoogleLoginBtn';
import AppleLoginBtn from './apple/AppleLoginBtn';
import StartIn3Seconds from './StartIn3Seconds';

function SocialLogin() {
  return (
    <div className="flex flex-col items-center gap-[0.7rem]">
      <StartIn3Seconds />
      <div className="flex justify-center gap-[1.25rem]">
        <GoogleLoginBtn />
        <KakaoLoginBtn />
        <AppleLoginBtn />
      </div>
    </div>
  );
}

export default SocialLogin;
