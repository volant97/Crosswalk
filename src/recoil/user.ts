import { atom } from 'recoil';
import { RegisterType } from '@/types/registerType';

export type UserState = { id: string; profile: RegisterType | null } | null;

/** 로그인 상태 */
export const userState = atom<UserState>({
  key: 'userState',
  default: null
});
