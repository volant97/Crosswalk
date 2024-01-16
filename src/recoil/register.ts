import { RegisterType } from '@/types/registerType';
import { atom } from 'recoil';

/** 회원 등록 정보 */
export const registerState = atom<RegisterType>({
  key: 'registerState',
  default: {
    uid: null,
    gender: null,
    mbti: null,
    height: null,
    interest: null,
    age: null,
    user_img: null,
    avatar: null,
    information_agreement: null,
    information_use_period: null,
    name: null
  }
});
