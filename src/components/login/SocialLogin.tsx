'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-config';
import KakaoLoginBtn from '@/components/login/kakao/KakaoLoginBtn';

function SocialLogin() {
  const getUsersByKakao = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('user state:', user);
  };

  useEffect(() => {
    getUsersByKakao();
  }, []);

  return (
    <div>
      {/* 구글 */}
      <KakaoLoginBtn />
      {/* 네이버 or 애플 */}
    </div>
  );
}

export default SocialLogin;
