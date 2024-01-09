'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/auth/auth';
import { IsLoginType } from '@/types/isLoginType';
import { Props } from '@/types/childrenPropsType';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';

function GetUser({ children }: Props) {
  const [userState, setUserState] = useRecoilState<IsLoginType>(isUserState);
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
          console.log(userState);
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
  }, [isLoading]);

  return <div>{isLoading ? <div>로딩중</div> : <div>{children}</div>}</div>;
}

export default GetUser;
