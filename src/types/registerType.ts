/**@type gender는 enum M, F만 설정 가능 */
export type RegisterType = {
  uid: string;
  name: string;
  gender: 'M' | 'F';
  mbti: string;
  age: number;
  height: number;
  interest: string[];
  user_img: string;
  avatar: number;
  notice: string;
  information_use_period: string;
  information_agreement: boolean;
};
