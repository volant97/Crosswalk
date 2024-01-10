import { RegisterType } from '@/types/registerType';
import { atom } from 'recoil';

/** 회원 등록 정보 */
export const registerState = atom<RegisterType>({
  key: 'registerState',
  default: {
    uid: null,
    name: null,
    gender: null,
    mbti: null,
    age: null,
    height: null,
    interest: null,
    user_img: null,
    avatar: null,
    notice: null,
    information_use_period: null,
    information_agreement: null
  }
});
