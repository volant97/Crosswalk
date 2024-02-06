import { UserState, userState } from '@/recoil/user';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRecoilValue } from 'recoil';

function ChatListIcon({
  pathname,
  active,
  lastMsg
}: {
  pathname: string;
  active: string;
  lastMsg: LastMessageArrayType | undefined;
}) {
  const getUid = useRecoilValue<UserState>(userState);

  return (
    <div
      className={` flex justify-center  items-center w-[25%]  ${
        pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
      }`}
    >
      <Link className="flex items-center gap-[4px] h-full text-[14px] font-semibold leading-[14px] " href="/chat-list">
        {pathname.startsWith('/chat-list') ? (
          <div className="w-[4.6875rem] h-8 flex px-[0.25rem] py-[0.62rem] items-center justify-center relative">
            <Image
              src="/assets/figmaImg/activeChat2.png"
              className="w-[1.9rem] h-[1.9rem] mr-[0.38rem] "
              width={100}
              height={100}
              alt="채팅함 이미지"
            />
            <h1>채팅</h1>
          </div>
        ) : (
          <div className="flex items-center justify-center relative">
            <Image
              src="/assets/figmaImg/chat2.png"
              className="w-[1.9rem] h-[1.9rem]"
              width={100}
              height={100}
              alt="채팅함 이미지"
            />
            {lastMsg !== undefined ? (
              lastMsg?.filter((item) => item?.user_uid !== getUid?.id).some((item) => item?.is_read === false) ? (
                <Image
                  src="/assets/figmaImg/greenDot.png"
                  alt="new message"
                  width={8}
                  height={8}
                  className="absolute top-[-1px] right-[-6px]"
                />
              ) : (
                <p></p>
              )
            ) : (
              <p></p>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}

export default ChatListIcon;
