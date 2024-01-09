'use client';

import { GoogleLogOut, GoogleLogin, getUser } from '@/components/register/GoogleLogin';

import { useEffect } from 'react';

export default function Home() {
  const users = async () => {
    const getUsers = await getUser();
    console.log(getUsers);
  };

  useEffect(() => {
    users();
  }, []);
  return (
    <div>
      {/* <GoogleLogin /> */}
      <button onClick={GoogleLogin}>구글 로그인</button>
      <button onClick={GoogleLogOut}>구글 로그아웃</button>
    </div>
  );
}
