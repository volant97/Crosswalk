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

function AuthenticationLayer({ children }: Props) {
  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);
  
  const pathname = usePathname();
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);
  const [register, setRegister] = useRecoilState(registerState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then((getSessionResponse) => {
      const session = getSessionResponse.data.session

      if (session) {
        const user = session.user
      }
    })

  }, [])

  /**소셜로그인한 유저 존재 여부 */
  const fetchUser = async () => {
    try {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUserState({
          uid: fetchedUser.id,
          isLogin: true
        });
        setIsLoading(false);
      } else {
        setUserState({
          uid: null,
          isLogin: false
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  /**접속한 유저의 회원등록정보 존재 여부 및 저장
   * setUserState.uid === fectchedCustomUser.uid recoil에 저장 */
  const fectchCustomUser = async () => {
    try {
      const fectchedCustomUser = await getAllData();
      const findCustomUser = fectchedCustomUser.find((f) => {
        return userState.uid === f.uid;
      });
      if (findCustomUser) {
        setRegister(findCustomUser);
      }
      // 테스트 console.log
      // console.log('fectchedCustomUser', fectchedCustomUser);
      // console.log('findCustomUser', findCustomUser);
      // console.log('register', register);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // [] 여기 상태 체크해야함. register 변경상태는 감지가 안될듯?
  useEffect(() => {
    fetchUser();
    fectchCustomUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, register.information_agreement]);

  return <div>{isLoading ? pathname.toString() === '/' ? <Landing /> : <Loading /> : <div>{children}</div>}</div>;
}

export default AuthenticationLayer;
