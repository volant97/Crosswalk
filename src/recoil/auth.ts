import { IsLoginType } from '@/types/isLoginType';
import { atom } from 'recoil';

/** 로그인 상태 */
export const isUserState = atom<IsLoginType>({
  key: 'isUserState',
  default: {
    uid: null,
    isLogin: false
  }
});
