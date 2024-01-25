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

const active = ' font-bold border-b-3 border-solid border-black';

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

  // const router = useRouter();

  const filtering = async () => {
    if (lastMsg === undefined) {
      return;
    } else {
      const filteredData = lastMsg?.filter((item: any) => {
        return item?.user_uid !== getUid?.id && item?.is_read === false;
      });
      console.log('이하민바보', lastMsg);
    }
  };

  const fetchChatListDataForMessageNotification = async () => {
    try {
      const chatListDataMessageNotification = await getChatListForMessageNotification();
      setChatList(chatListDataMessageNotification);

      const roomIds = chatListDataMessageNotification.map((item: any) => item.id);
      console.log('roomIds', roomIds);

      const lastMessageArray = await getLastMessageForMessageNotification(roomIds);
      setLastMsg(lastMessageArray);
      console.log('lastMessageArray 여기까지지?', lastMessageArray);

      // lastMsg에 의존하는 코드를 이 블록 내부로 이동
      // const filteredData = lastMessageArray?.filter((item: any) => {
      //   return item?.user_uid !== getUid?.id && item?.is_read === false;
      // });
      // const filterUnreadMessages = await filtering();
      // if (filterUnreadMessages === undefined) {
      //   return;
      // } else {
      //   console.log('필터링잘되나', filterUnreadMessages);
      //   setFilteredUnreadMessage(filterUnreadMessages as unknown as filteredUnreadMessage[]);
      //   console.log('filterUnreadMessages:::::', filterUnreadMessages);
      // }

      // console.log('filteredData', filteredData);

      // setFilteredData(filteredData);

      // const countUnreadMessage = filteredData?.length;
      // console.log('내가 안읽은 메세지', countUnreadMessage);
      // setCountUnreadMessage(countUnreadMessage);
      // console.log('최종 set된 안읽은 메세지 숫자', countUnreadMessage);
    } catch (error) {
      console.log('fetchChatList에서 에러 발생', error);
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  // const fetchChatListDataForMessageNotification = async () => {
  //   try {
  //     const chatListDataMessageNotification = await getChatListForMessageNotification();
  //     console.log('병아리', chatListDataMessageNotification);
  //     setChatList(chatListDataMessageNotification);
  //     const roomIds = chatListDataMessageNotification.map((item: any) => item.id);

  //     const lastMessageArray = await getLastMessageForMessageNotification(roomIds);
  //     setLastMsg(lastMessageArray);
  //     console.log('닭', lastMsg);

  //     const filteredData = lastMsg?.filter((item) => {
  //       return item?.user_uid !== getUid?.id && item?.is_read === false;
  //     });
  //     console.log('filteredData', filteredData);
  //     setFilteredUnreadMessage(filteredData as unknown as filteredUnreadMessage[]);

  //     console.log('소간지', filteredUnreadMessage);
  //     const countUnreadMessage = filteredUnreadMessage?.length;
  //     console.log('내가 안읽은 메세지', countUnreadMessage);
  //     setCountUnreadMessage(countUnreadMessage);
  //     console.log('최종set된 안읽은 메세지 숫자', countUnreadMessage);
  //   } catch (error) {
  //     console.log('error in fetchChatList', error);
  //     alert('서버와의 통신을 실패했습니다.');
  //   }
  // };

  // useEffect(() => {
  //   subscribeMessageForNotification((payload: any) => {
  //     console.log('payload:', payload);
  //     fetchChatListDataForMessageNotification();
  //   });
  //   fetchChatListDataForMessageNotification();
  //   return () => {
  //     untrackMessageForNotification();
  //   };
  // }, []);

  useEffect(() => {
    // const fetchData = async () => {
    //   await fetchChatListDataForMessageNotification();
    // };
    subscribeMessageForNotification((payload: any) => {
      console.log('payload:', payload);
      fetchChatListDataForMessageNotification();
    });
    fetchChatListDataForMessageNotification();
    return () => {
      untrackMessageForNotification();
    };
  }, []);

  useEffect(() => {
    console.log('lastMsg가 업데이트되었습니다');
  }, [lastMsg]);

  useEffect(() => {
    console.log('filteredData가 업데이트되었습니다');
  }, [filteredData]);

  // useEffect(() => {
  //   const countUnreadMessage = filteredUnreadMessage?.length;
  //   console.log('내가 안읽은 메세지 use', countUnreadMessage);
  //   setCountUnreadMessage(countUnreadMessage);
  //   console.log('최종set된 안읽은 메세지 숫자 use', countUnreadMessage);
  // }, [filteredUnreadMessage]);

  return (
    <nav className="h-[7dvh] bg-white shadow-navBarShadow grid grid-cols-3 items-center w-full pl-[20px] pr-[20px] ">
      <div
        className={`w-[full] h-full flex justify-center items-center pb-[1px] ${
          pathname.startsWith('/request') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center justify-center gap-[4px] h-full text-[14px]" href="/request">
          {pathname.startsWith('/request') ? (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeRequest.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/request.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="받은 요청함 이미지"
              />
            </div>
          )}
          Request
        </Link>
      </div>

      <div
        className={` w-[full] h-full flex justify-center  items-center ${
          pathname.startsWith('/chat-list') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] pb-[1px]" href="/chat-list">
          {pathname.startsWith('/chat-list') ? (
            <div className="flex items-center justify-center relative">
              <Image
                src="/assets/figmaImg/activeChat.png"
                className="w-[1.25rem] h-[1.25rem]"
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
          ) : (
            <div className="flex items-center justify-center relative">
              <Image
                src="/assets/figmaImg/chat.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="채팅함 이미지"
              />
              {/* 내가 받은 메세지를 봤냐 안봣냐 */}
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
          Chat
        </Link>
      </div>

      <div
        className={` w-[full] h-full flex justify-center  items-center ${
          pathname.startsWith('/my-profile') ? `${active}` : 'text-slate-300'
        }`}
      >
        <Link className="flex items-center gap-[4px] h-full text-[14px] pb-[1px]" href="/my-profile">
          {pathname.startsWith('/my-profile') ? (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/activeUserCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <Image
                src="/assets/figmaImg/userCircle.png"
                className="w-[1.25rem] h-[1.25rem]"
                width={100}
                height={100}
                alt="마이페이지 이미지"
              />
            </div>
          )}
          My
        </Link>
      </div>
    </nav>

    // <nav className="ml-[-33px]  flex gap-[30px] items-center border-t-1 border-solid boredr-black h-[2.2rem] w-[24rem]  px-[5px] shadow-md mb-[1.8rem] ">
  );
}

export default NavBar;
