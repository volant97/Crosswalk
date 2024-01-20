'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { RegisterType, unMatchedDataType } from '@/types/registerType';
import { getAllData, getUnMatchedData } from '@/lib/api/SupabaseApi';
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
import SlideButton from '../SlideButton';
import { Navigation } from 'swiper/modules';
import { useRouter, useSearchParams } from 'next/navigation';
import { currentIndexState } from '@/recoil/currentIndex';
import useAlertModal from '../common/modal/AlertModal';
import { supabase } from '@/lib/supabase-config';
import Image from 'next/image';

function FetchUserCards() {
  const searchParams = useSearchParams();
  console.log('searchParams', searchParams.get('i'));
  const router = useRouter();
  const initialSlide = Number(searchParams.get('i') || 0);
  // 리코일 상태로 전역상태 관리하여 스테이트 값으로 하나씩 증가
  const { openModal, AlertModal } = useAlertModal();
  const [userCards, setUserCards] = useState<(unMatchedDataType | any)[]>([]);
  const [registerData, setRegisterData] = useRecoilState(userState);
  const [userUids, setUserUids] = useState<any>([]);
  const [activeUserUid, setActiveUserUid] = useState<string>('');
  const [swiper, setSwiper] = useState<any>(null);
  const myGender = registerData?.profile?.gender;
  const myUid = registerData?.profile?.uid;
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);

  const getUerCards = async () => {
    try {
      if (!myUid) return;
      const userCards = await getUnMatchedData(myUid);
      // let repeatedUserCards: any = [];

      // const repeatCount = 6; // 임시방편 무한루프

      // for (let i = 0; i < repeatCount; i++) {
      //   repeatedUserCards = repeatedUserCards.concat(userCards);
      // }
      if (!userCards) return;
      setUserCards(userCards);

      const uids = userCards
        .filter((item) => item?.uid !== myUid && item?.gender !== myGender)
        .map((item: any) => item.uid);
      setUserUids(uids);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };

  // 슬라이드 할 때 마다 값 가져오기
  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;

    const activeUserUid = userUids[activeIndex];
    setActiveUserUid(activeUserUid);

    console.log('Active User UID:', activeUserUid);
  };

  useEffect(() => {
    getUerCards();
  }, []);

  const filteredCards = userCards?.filter((item) => item.uid !== myUid && item.gender !== myGender);
  const flirtingUserUids =
    userCards?.filter((item: any) => item.uid !== myUid && item.gender !== myGender)?.map((item: any) => item.uid) ||
    [];

  const handleLike = () => {
    const likedUserUid = userUids[currentIndex];
    openFlirtingModal(likedUserUid || flirtingUserUids[0], currentIndex);
    console.log('activeUserUid', likedUserUid || flirtingUserUids[0]);
  };

  console.log('currentIndex', currentIndex);
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper: any) => {
          handleSlideChange(swiper);
        }}
        onSwiper={(swiper: any) => setSwiper(swiper)}
        className="!px-[1.5rem] !py-[2rem]"
        navigation={true}
        touchRatio={0}
        loop={true}
        loopAdditionalSlides={0}
        initialSlide={initialSlide}
        onTransitionEnd={(swiper) => setCurrentIndex(swiper.realIndex)}
      >
        {filteredCards?.map((item: any, index) => (
          <SwiperSlide key={item.uid}>
            <UserCard
              index={index}
              age={item.age}
              name={item.name}
              interest={item.interest}
              avatar={item.avatar}
              flirtingUserUid={item.uid}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex gap-3 px-[20px] justify-between gap-x-2">
        <SlideButton
          nextCard={() => {
            if (swiper) {
              swiper.slideNext();
              router.push(`/main?i=${currentIndex + 1}`); // 문제되는 부분
            }
            if (currentIndex === filteredCards.length - 1) {
              openModal('마지막 카드입니다. 다시 처음으로 돌아갑니다!');

              setCurrentIndex(0);
              router.push(`/main`);
            }
          }}
          color="default"
          size="lg"
        >
          <IoClose size={20} /> 괜찮아요
        </SlideButton>

        <Button
          openFlirtingModal={() => {
            handleLike();
          }}
          color="green"
          size="lg"
        >
          <Image src="/assets/button/heart.png" width={20} height={20} alt="heart" /> 어필하기
        </Button>
      </div>
      {flirtingModal()}
      {AlertModal()}
    </div>
  );
}

export default FetchUserCards;
