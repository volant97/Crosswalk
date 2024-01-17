'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/auth/auth';
import { IsLoginType } from '@/types/isLoginType';
import { Props } from '@/types/childrenPropsType';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import Logout from './Logout';
import { usePathname } from 'next/navigation';
import Loading from './Loading';
import { registerState } from '@/recoil/register';
import TempHome from './TempHome';
import { getAllData } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { userState } from '@/recoil/user';
import { RegisterType } from '@/types/registerType';
import { User } from '@supabase/supabase-js';

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

  return isAuthInitialized ? children : <Loading />;
}

export default AuthenticationLayer;
