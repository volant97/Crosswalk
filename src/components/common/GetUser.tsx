'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/auth/auth';
import { IsLoginType } from '@/types/isLoginType';
import { Props } from '@/types/childrenPropsType';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import Logout from './Logout';
import Landing from '../login/landing/Landing';
import { usePathname } from 'next/navigation';
import Loading from './Loading';
import { registerState } from '@/recoil/register';
import TempHome from './TempHome';

function GetUser({ children }: Props) {
  const pathname = usePathname();
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);
  const [register, setRegister] = useRecoilState(registerState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchUser = await getUser();
        if (fetchUser) {
          setUserState({
            uid: fetchUser.id,
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
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div>
      <div>{isLoading ? pathname.toString() === '/' ? <Landing /> : <Loading /> : <div>{children}</div>}</div>
      {/* test */}
      {/* <div>로그인 여부 : {!!userState.uid ? 'true' : 'false'}</div>
      <div>회원등록 여부 : {register.information_agreement ? 'true' : 'false'}</div>
      <button
        onClick={() => {
          setRegister({
            ...register,
            information_agreement: !register.information_agreement
          });
        }}
      >
        회원등록 토글
      </button>
      <Logout />
      <TempHome /> */}
    </div>
  );
}

export default GetUser;
