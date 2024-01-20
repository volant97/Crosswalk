import { atom } from 'recoil';

export const currentIndexState = atom({
  key: 'currentIndexState',
  default: 0
});

export const nextSlideState = atom({
  key: 'nextSlideState',
  default: false
});
