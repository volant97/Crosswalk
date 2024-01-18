'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { RegisterType } from '@/types/registerType';
import { getAllData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import FlirtingModal from '../common/modal/FlirtingModal';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { userState } from '@/recoil/user';
import Button from '../Button';
import { IoClose } from 'react-icons/io5';
import useFlirtingModal from '../common/modal/FlirtingModal';
import { GoHeartFill } from 'react-icons/go';

function FetchUserCards() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const [getUid, setGetUid] = useRecoilState(isUserState);
  const myUid = getUid.uid;
  const [registerData, setRegisterData] = useRecoilState(userState);
  const [userUids, setUserUids] = useState<any>([]);
  const myGender = registerData?.profile?.gender;
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem('sliderIndex');
    return storedIndex ? parseInt(storedIndex, userCards.length) : 0;
  });

  const totalCards = userCards.length - 1;
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const getUerCards = async () => {
    try {
      const userCards = await getAllData();
      // let repeatedUserCards: any = [];
      // const repeatCount = 6; // 임시방편 무한루프

      // for (let i = 0; i < repeatCount; i++) {
      //   repeatedUserCards = repeatedUserCards.concat(userCards);
      // }

      setUserCards(userCards);

      const uids = userCards.map((item: any) => item.uid);
      setUserUids(uids);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };

  // 슬라이드 할 때 마다 값 가져오기
  const handleSlideChange = (swiper: any) => {
    // Access the currently active slide index
    const activeIndex = swiper.activeIndex;

    // Get the UID of the user card at the active index
    const activeUserUid = userUids[activeIndex];

    // Do something with the UID, for example, log it
    console.log('Active User UID:', activeUserUid);
  };
  useEffect(() => {
    getUerCards();
  }, []);

  useEffect(() => {
    localStorage.setItem('sliderIndex', currentIndex.toString());
  }, [currentIndex]);

  const handleLike = () => {
    const userId = openFlirtingModal(handleSlideChange);
    return userId;
  };

  const filteredCards = userCards?.filter((item) => item.uid !== myUid && item.gender !== myGender);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper: any) => {
          handleSlideChange(swiper);
        }}
        onSwiper={(swiper: any) => console.log(swiper)}
        className="!px-[1.5rem] !py-[2rem]"
      >
        {filteredCards?.map((item: any) => (
          <SwiperSlide key={item.uid}>
            <UserCard
              age={item.age}
              name={item.name}
              interest={item.interest}
              avatar={item.avatar}
              flirtingUserUid={item.uid}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-3 px-[20px] flex justify-between gap-x-2">
        <Button onClick={() => {}} color="default">
          <IoClose size={20} /> 괜찮아요
        </Button>
        <Button
          openFlirtingModal={() => {
            // handleLike();
            console.log('userId');
          }}
          color="green"
          size="lg"
        >
          <GoHeartFill size={20} /> 어필하기
        </Button>
      </div>
      {flirtingModal()}
    </div>
  );
}

export default FetchUserCards;

{
  /* <ul className="overflow-x-scroll gap-x-[1.5rem] flex py-[2rem] px-[1.5rem]"></ul> */
}
// {userCards
//   ?.filter((itme: any) => itme.uid !== myUid)
//   ?.map((item: any, index) => {
//     return (
//       <div
//         key={index}
//         className={}
//         // className={`transform transition-transform ease-in-out duration-300`}
//         // style={{ transform: `translateX(${-currentIndex * 100}%)` }}
//       >
//
//       </div>
//     );
//   })}
