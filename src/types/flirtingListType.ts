export type FlirtingListType = {
  id: number | null;
  created_at: Date | null;
  flirting_message: string | null;
  status: string | null;
  sender_is_read_in_noti: boolean | null;
  receiver_is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};

export type FlirtingListRequestType = {
  id: number;
  created_at: Date;
  sender_uid: string;
  flirting_message: string;
  receiver_uid: string;
  sender_is_read_in_noti: Boolean;
  receiver_is_read_in_noti: boolean;
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
  created_at: Date;
  flirting_message: string;
  id: number;
  status: string;
  sender_is_read_in_noti: boolean;
  receiver_is_read_in_noti: boolean;
  receiver_uid: string;
  sender_uid: string;
  custom_users: MyType;
};
