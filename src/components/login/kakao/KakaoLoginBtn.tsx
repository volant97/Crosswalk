'use client';

import { supabase } from '@/lib/supabase-config';
import React from 'react';

function KakaoLoginBtn() {
  async function kakaoLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });
    if (data) alert('로그인 되었습니다');
    if (error) console.error('login error : ', error);
  }

  async function kakaoLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('logout error : ', error);
    alert('로그아웃 되었습니다');
  }

  return (
    <>
      <button type="submit" onClick={kakaoLogin}>
        Kakao 로그인
      </button>
      <button type="button" onClick={kakaoLogout}>
        Kakao 로그아웃
      </button>
    </>
  );
}

export default KakaoLoginBtn;
