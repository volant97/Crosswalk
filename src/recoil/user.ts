import { IsLoginType } from '@/types/isLoginType';
import { RegisterType } from '@/types/registerType';
import { User } from '@supabase/supabase-js';
import { atom } from 'recoil';

type UserState = { id: string; profile: RegisterType | null } | null;

/** 로그인 상태 */
export const userState = atom<UserState>({
  key: 'userState',
  default: null
});
