export type FlirtingListType = {
  created_at: Date | null;
  flirting_message: string | null;
  id: number | null;
  is_matched: boolean | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};

export type GetRequestedFlirtingDataType = {
  created_at: string | null;
  custom_users: {
    age: number | null;
    name: string | null;
    avatar: string | null;
  } | null;
  flirting_message: string | null;
  id: number | null;
  is_matched: boolean | null;
  is_read_in_noti: boolean | null;
  receiver_uid: string | null;
  sender_uid: string | null;
};
