export type FlirtingListType = {
  created_at: Date | null;
  flirting_message: string | null;
  id: number | null;
  is_matched: boolean | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};

export type FlirtingListRequestType = {
  created_at: Date;
  flirting_message: string;
  id: number;
  is_matched: boolean | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string;
  sender_uid: string;
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
