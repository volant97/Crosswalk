'use client';

import { logout } from '@/auth/auth';
import { isUserState } from '@/recoil/auth';
import { IsLoginType } from '@/types/isLoginType';
import React from 'react';
import { useRecoilState } from 'recoil';

function Logout() {
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);

  const handleLogoutBtn = () => {
    logout();
    setUserState({
      uid: null,
      isLogin: false
    });
  };

  return (
    <div>
      <button type="button" onClick={handleLogoutBtn}>
        로그아웃
      </button>
    </div>
  );
}

export default Logout;
