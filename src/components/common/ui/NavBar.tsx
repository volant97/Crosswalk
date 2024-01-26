'use client';
import {
  getChatListForMessageNotification,
  getLastMessageForMessageNotification,
  subscribeMessageForNotification,
  untrackMessageForNotification
} from '@/lib/api/SupabaseApi';
import { LastMessageState } from '@/recoil/lastMessageData';
import { UserState, userState } from '@/recoil/user';
import { LastMessageArrayType } from '@/types/lastMessageArrayType';
import { ChatListType, LastMessageDataType } from '@/types/realTimeType';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type filteredUnreadMessage = ({
  created_at: string;
  id: number;
  is_read: boolean;
  message: string;
  user_uid: string;
} | null)[];

function NavBar() {
  const pathname = usePathname();
  const [chatList, setChatList] = useState<ChatListType[]>();
  const [getUid, setGetUid] = useRecoilState<UserState>(userState);
  const [lastMsg, setLastMsg] = useState<LastMessageArrayType>();
  const [filteredUnreadMessage, setFilteredUnreadMessage] =
    useState<React.SetStateAction<filteredUnreadMessage[] | undefined>>();
  const [countUnreadMessage, setCountUnreadMessage] = useState<number>();
  const [filteredData, setFilteredData] = useState<LastMessageArrayType>();
  const [isGreen, setIsGreen] = useState(false);

  // const router = useRouter();

  // const filtering = async () => {
  //   if (lastMsg === undefined) {
  //     return;
  //   } else {
  //     const filteredData = lastMsg?.filter((item: any) => {
  //       return item?.user_uid !== getUid?.id && item?.is_read === false;
  //     });
  //     console.log('이하민바보', lastMsg);
  //   }
  // };

  const fetchChatListDataForMessageNotification = async () => {
    try {
      const chatListDataMessageNotification = await getChatListForMessageNotification();
      setChatList(chatListDataMessageNotification);

      const roomIds = chatListDataMessageNotification.map((item: any) => item.id);
      // console.log('roomIds', roomIds);

      const lastMessageArray = await getLastMessageForMessageNotification(roomIds);
      setLastMsg(lastMessageArray);
      // console.log('lastMessageArray', lastMessageArray);
    } catch (error) {
      console.log('fetchChatList에서 에러 발생', error);
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

  useEffect(() => {
    // console.log('lastMsg가 업데이트되었습니다');
  }, [lastMsg]);

  useEffect(() => {
    // console.log('filteredData가 업데이트되었습니다');
  }, [filteredData]);

  const handleClick = () => {
    setIsGreen(true);
  };

  // useEffect(() => {
  //   setIsGreen(true);
  // }, []);

  const active = `font-bold 
     bg-customGreen2 
    rounded-[0.375rem]`;

  return (
    <nav
      className={`fixed left-0 right-0 bottom-0 max-w-[26.8rem] mr-auto ml-auto  h-[7dvh] bg-white shadow-navBarShadow flex flex-row justify-center items-center px-6 `}
    >
      <div
        className={` flex justify-center items-center w-[25%] ${
          pathname.startsWith('/main') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center justify-center text-[14px]" href="/main">
          {pathname.startsWith('/main') ? (
            <div className=" w-[3.93rem] h-8 flex items-center justify-center">
              <Image
                src="/assets/figmaImg/activeHome.png"
                className="w-[1.5rem] h-[1.5rem] mr-[0.38rem]"
                width={100}
                height={100}
                alt="홈 이미지"
              />
              <h1>홈</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/home.png"
                className="w-[1.5rem] h-[1.5rem]"
                width={100}
                height={100}
                alt="홈 이미지"
              />
            </div>
          )}
        </Link>
      </div>
      <div
        className={` flex justify-center items-center w-[25%]  ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center justify-center gap-[4px] h-full text-[14px]" href="/request">
          {pathname.startsWith('/request') ? (
            <div className=" w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeRequest.png"
                className="w-[1.5rem] h-[1.5rem] mr-[0.38rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
              <h1>요청함</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/request.png"
                className="w-[1.5rem] h-[1.5rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
        </Link>
      </div>

      <div
        className={` flex justify-center  items-center w-[25%]  ${
          pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] " href="/chat-list">
          {pathname.startsWith('/chat-list') ? (
            <div className="w-[4.6875rem] h-8 flex px-[0.25rem] py-[0.62rem] items-center justify-center relative">
              <Image
                src="/assets/figmaImg/activeChat.png"
                className="w-[1.5rem] h-[1.5rem] mr-[0.38rem] "
                width={100}
                height={100}
                alt="채팅함 이미지"
              />
              <h1>채팅</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center relative">
              <Image
                src="/assets/figmaImg/chat.png"
                className="w-[1.5rem] h-[1.5rem]"
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

      <div
        className={` flex justify-center  items-center w-[25%]  ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] " href="/my-profile">
          {pathname.startsWith('/my-profile') ? (
            <div className="w-[5.437rem] h-8 px-[0.25rem] py-[0.62rem] flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeUserCircle.png"
                className="w-[1.5rem] h-[1.5rem]  mr-[0.38rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
              <h1>프로필</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/UserCircle.png"
                className="w-[1.5rem] h-[1.5rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
            </div>
          )}
        </Link>
      </div>
    </nav>

    // <nav className="ml-[-33px]  flex gap-[30px] items-center border-t-1 border-solid boredr-black h-[2.2rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem] ">
  );
}

export default NavBar;
