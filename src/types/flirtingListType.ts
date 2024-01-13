export type FlirtingListType = {
  created_at: Date | null;
  flirting_message: string | null;
  id: number | null;
  status: string | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};

export type FlirtingListRequestType = {
  created_at: string | null;
  custom_users: {
    age: number | null;
    name: string | null;
    avatar: number | null;
  } | null;
  flirting_message: string | null;
  id: number | null;
  status: string | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};

export type MyType = {
  name: string;
};

export type FlirtingListInNotificationType = {
  created_at: Date | null;
  flirting_message: string | null;
  id: number | null;
  status: string | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
  custom_users: MyType;
};
