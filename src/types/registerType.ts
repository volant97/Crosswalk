/**@type gender는 enum M, F만 설정 가능 */
export type RegisterType = {
  uid: string | null;
  name: string | null;
  gender: string | null;
  mbti: string | null;
  age: number | null;
  height: number | null;
  interest: string[] | null;
  user_img: string | null;
  avatar: number | null;
  notice: string | null;
  information_use_period: string | null;
  information_agreement: boolean | null;
};
