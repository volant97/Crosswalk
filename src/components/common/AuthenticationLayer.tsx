'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/auth/auth';
import { IsLoginType } from '@/types/isLoginType';
import { Props } from '@/types/childrenPropsType';
import { useRecoilState } from 'recoil';
import Logout from './Logout';
import Loading from './Loading';
import { supabase } from '@/lib/supabase-config';
import { userState } from '@/recoil/user';
import { RegisterType } from '@/types/registerType';
import TempHome from './TempHome';

function AuthenticationLayer({ children }: Props) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        supabase
          .from('custom_users')
          .select()
          .eq('uid', session.user.id)
          .returns<RegisterType>()
          .single()
          .then((response) => {
            const profile = response.data; //custom_users
            setUser({ id: session.user.id, profile });
          });
      } else {
        setUser(null);
      }
      setIsAuthInitialized(true);
    });
  }, [isAuthInitialized, setUser]);

  console.log('user', user);

  return (
    <>
      <div>{isAuthInitialized ? children : <Loading />}</div>
      {/* test */}
      <div>로그인 여부 : {!!user?.id ? 'true' : 'false'}</div>
      <div>회원등록 여부 : {user?.profile?.information_agreement ? 'true' : 'false'}</div>
      <Logout />
      <TempHome />
    </>
  );
}
{
  /* <div>{isLoading ? pathname.toString() === '/' ? <Landing /> : <Loading /> : <div>{children}</div>}</div> */
}

export default AuthenticationLayer;
