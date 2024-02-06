'use client';
import {
  getChatListForMessageNotification,
  getLastMessageForMessageNotification,
  subscribeMessageForNotification,
  untrackMessageForNotification
} from '@/lib/api/SupabaseApi';
import { UserState, userState } from '@/recoil/user';
import { filteredUnreadMessage } from '@/types/etcType';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';
import { ChatListType } from '@/types/realTimeType';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import HomeIcon from './HomeIcon';
import RequestIcon from './RequestIcon';
import ChatListIcon from './ChatListIcon';
import MyProfileIcon from './MyProfileIcon';

function NavBar() {
  const pathname = usePathname();
  const [chatList, setChatList] = useState<ChatListType[]>();
  const getUid = useRecoilValue<UserState>(userState);
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>();
  const [filteredUnreadMessage, setFilteredUnreadMessage] =
    useState<React.SetStateAction<filteredUnreadMessage[] | undefined>>();
  const [countUnreadMessage, setCountUnreadMessage] = useState<number>();
  const [filteredData, setFilteredData] = useState<LastMessageArrayType>();

  const fetchChatListDataForMessageNotification = async () => {
    try {
      const chatListDataMessageNotification = await getChatListForMessageNotification();
      setChatList(chatListDataMessageNotification);
      const roomIds = chatListDataMessageNotification.map((item: any) => item.id);
      const lastMessageArray = await getLastMessageForMessageNotification(roomIds);
      setLastMsg(lastMessageArray);
      // console.log('lastMessageArray', lastMessageArray);
    } catch (error) {
      console.error('fetchChatList에서 에러 발생', error);
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    subscribeMessageForNotification((payload: any) => {
      // console.log('payload:', payload);
      fetchChatListDataForMessageNotification();
    });
    fetchChatListDataForMessageNotification();
    return () => {
      untrackMessageForNotification();
    };
  }, []);

  const active = `font-bold 
     bg-customGreen2 
    rounded-[0.375rem]`;

  // if (!lastMsg) {
  //   return null;
  // }

  return (
    <nav
      className={`sticky bottom-0  h-[8.8dvh] bg-white shadow-navBarShadow flex justify-center items-start pt-[1.6dvh] px-6 z-50`}
    >
      <HomeIcon pathname={pathname} active={active} />
      {/* <div
        className={` flex justify-center items-center w-[25%] ${
          pathname.startsWith('/main') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center justify-center text-[14px] font-semibold leading-[14px]" href="/main">
          {pathname.startsWith('/main') ? (
            <div className=" w-[3.93rem] h-8 flex items-center justify-center">
              <Image
                src="/assets/figmaImg/activeHome2.png"
                className="w-[1.9rem] h-[1.9rem] mr-[0.38rem]"
                width={100}
                height={100}
                alt="홈 이미지"
              />
              <h1>홈</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/home2.png"
                className="w-[1.9rem] h-[1.9rem]"
                width={100}
                height={100}
                alt="홈 이미지"
              />
            </div>
          )}
        </Link>
      </div> */}
      <RequestIcon pathname={pathname} active={active} />
      {/* <div
        className={` flex justify-center items-center w-[25%]  ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link
          className="flex items-center justify-center gap-[4px] h-full text-[14px] font-semibold leading-[14px]"
          href="/request"
        >
          {pathname.startsWith('/request') ? (
            <div className=" w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeRequest2.png"
                className="w-[1.9rem] h-[1.9rem] mr-[0.38rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
              <h1>요청함</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/request2.png"
                className="w-[1.9rem] h-[1.9rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
        </Link>
      </div> */}
      <ChatListIcon pathname={pathname} active={active} lastMsg={lastMsg} />
      {/* <div
        className={` flex justify-center  items-center w-[25%]  ${
          pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link
          className="flex items-center gap-[4px] h-full text-[14px] font-semibold leading-[14px] "
          href="/chat-list"
        >
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
      </div> */}
      <MyProfileIcon pathname={pathname} active={active} />
      {/* <div
        className={` flex justify-center  items-center w-[25%]  ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link
          className="flex items-center gap-[4px] h-full text-[14px] font-semibold leading-[14px] "
          href="/my-profile"
        >
          {pathname.startsWith('/my-profile') ? (
            <div className="w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeUserCircle2.png"
                className="w-[1.9rem] h-[1.9rem]  mr-[0.38rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
              <h1>프로필</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/userCircle2.png"
                className="w-[1.9rem] h-[1.9rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
            </div>
          )}
        </Link>
      </div> */}
    </nav>
  );
}

export default NavBar;
