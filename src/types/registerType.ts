/**@type gender는 enum M, F만 설정 가능 */
export type RegisterType = {
  uid: string | null;
  name: string | null;
  gender: 'M' | 'F' | null;
  mbti: string | null;
  age: number | null;
  height: number | null;
  interest: string[] | null;
  user_img: string | null;
  avatar: number | null;
  information_use_period: string | null;
  information_agreement: boolean | null;
};

export type unNullRegisterType = {
  uid: string;
  name: string;
  gender: 'M' | 'F';
  mbti: string;
  age: number;
  height: number;
  interest: string[];
  user_img: string;
  avatar: number;
  information_use_period: string;
  information_agreement: boolean;
};

export type unMatchedDataType = {
  uid: string
  name: string | null;
  gender: 'M' | 'F' | null;
  mbti: string | null;
  age: number | null;
  height: number | null;
  interest: string[] | null;
  user_img: string | null;
  avatar: number | null;
  information_use_period: string | null;
  information_agreement: boolean | null;
  flirting_list: {
    sender_uid: string;
    status: string;
  };
};
