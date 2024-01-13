export type FlirtingListType = {
  id: number | null;
  created_at: Date | null;
  sender_uid: string | null;
  flirting_message: string | null;
  receiver_uid: string | null;
  is_read_in_noti: boolean | null;
  status: string | null;
};

export type FlirtingListRequestType = {
  id: number;
  created_at: Date;
  sender_uid: string;
  flirting_message: string;
  receiver_uid: string;
  is_read_in_noti: boolean;
  status: string;
  custom_users: {
    age: number;
    name: string;
    avatar: number;
  };
};

export type MyType = {
  name: string;
};

export type FlirtingListInNotificationType = {
  created_at: Date | null;
  flirting_message: string | null;
  id: number | null;
  is_matched: boolean | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
  custom_users: MyType;
};
