export type filteredUnreadMessage = ({
  created_at: string;
  id: number;
  is_read: boolean;
  message: string;
  user_uid: string;
} | null)[];

export type contactContentsType = {
  uid: string | null | undefined;
  name: string | null | undefined;
  gender: 'M' | 'F' | null | undefined;
  email: string | undefined;
  category: string | undefined;
  content: string | undefined;
  emailAgree: boolean;
};

export type getSoulmateStatus = {
  sender_uid: string;
  receiver_uid: string;
  status: string;
};
