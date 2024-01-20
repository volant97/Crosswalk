'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-config';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { usePathname } from 'next/navigation';
import { Props } from '@/types/childrenPropsType';
import { RegisterType } from '@/types/registerType';
import Logout from './Logout';
import Loading from './Loading';
import TempHome from './TempHome';

function AuthenticationLayer({ children }: Props) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const pathname = usePathname();

  useEffect(() => {
    const { data: authlistener } = supabase.auth.onAuthStateChange((event, session) => {
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
    // console.log('user', user);
    // return () => {
    //   if (authlistener) authlistener.unsubscribe();
    // };
  }, [isAuthInitialized, setUser]);

  return (
    <>
      {/* <div>{isAuthInitialized ? children : <Loading />}</div> */}
      {/* <div>{isAuthInitialized || pathname.toString() === '/' ? children : <Loading />}</div> */}
      <div>{isAuthInitialized ? children : <Loading />}</div>
      {/* test */}
      {/* <div>로그인 여부 : {!!user?.id ? 'true' : 'false'}</div>
      <div>회원등록 여부 : {user?.profile?.information_agreement ? 'true' : 'false'}</div>
      <Logout />
      <TempHome /> */}
    </>
  );
}

export default AuthenticationLayer;
