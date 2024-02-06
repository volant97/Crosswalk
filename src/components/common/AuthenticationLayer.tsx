'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { supabase } from '@/lib/supabase-config';
import Loading from './Loading';
import { RegisterType } from '@/types/registerType';
import type { Props } from '@/types/childrenPropsType copy';

function AuthenticationLayer({ children }: Props) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useRecoilState(userState);

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
  }, [isAuthInitialized, setUser]);

  return <div>{isAuthInitialized ? children : <Loading />}</div>;
}

export default AuthenticationLayer;
