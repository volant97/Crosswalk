'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { unMatchedDataType } from '@/types/registerType';
import { getUnMatchedData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { userState } from '@/recoil/user';
import Button from '../Button';
import { IoClose } from 'react-icons/io5';
import useFlirtingModal from '../common/modal/FlirtingModal';
import SlideButton from '../SlideButton';
import { Navigation } from 'swiper/modules';
import { useRouter, useSearchParams } from 'next/navigation';
import { nextSlideState } from '@/recoil/currentIndex';
import useAlertModal from '../common/modal/AlertModal';

import Image from 'next/image';

import SlideEffect from './SlideEffect';
import SkeletonMain from './SkeletonMain';
import { truncate } from 'fs';

function FetchUserCards() {
  // const searchParams = useSearchParams();
  // console.log('searchParams', searchParams.get('i'));
  // const router = useRouter();
  // const index = Number(searchParams.get('index') || 0);
  // const initialSlide = Number(searchParams.get('i') || 0);
  // 리코일 상태로 전역상태 관리하여 스테이트 값으로 하나씩 증가
  const { openModal, AlertModal } = useAlertModal();
  const [userCards, setUserCards] = useState<(unMatchedDataType | any)[]>([]);
  const [registerData, setRegisterData] = useRecoilState(userState);
  const [userUids, setUserUids] = useState<any>([]);
  const [activeUserUids, setActiveUserUids] = useState<string>('');
  const [swiper, setSwiper] = useState<any>(null);
  const myGender = registerData?.profile?.gender;
  const myUid = registerData?.profile?.uid;
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();
  const [isSwitchNextSlide, setIsSwitchNextSlide] = useRecoilState(nextSlideState);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHateEffect, setIsHateEffect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserCards = async () => {
    try {
      if (!myUid) return;
      if (!myGender) return;
      // setIsLoading(true);
      const userCards = await getUnMatchedData(myUid, myGender);
      if (!userCards) return;

      setUserCards(userCards);
      const uids = userCards?.map((item: any) => item.uid);
      setUserUids(uids);
      console.log('userCards', userCards);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      openModal('불러오는 도중 문제가 발생하였습니다.');
    }
  };

  const firstNextSlide = () => {
    swiper.slideTo(1, 400, false);
  };

  // 슬라이드 할 때 마다 값 가져오기
  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.realIndex;

    const activeUserUid = userUids[activeIndex];
    setActiveUserUids(activeUserUid);
    setIsFlipped(false);

    if (activeUserUid) {
      setIsHateEffect(true);
    } else {
      setIsHateEffect(false);
    }
  };

  useEffect(() => {
    getUserCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData]);

  useEffect(() => {
    if (activeUserUids && isSwitchNextSlide === true && swiper) {
      swiper.slideNext();
    }
    return () => {
      setIsSwitchNextSlide(false);
      setTimeout(() => {
        setIsHateEffect(false);
      }, 350);
    };
  }, [activeUserUids, isSwitchNextSlide, setIsSwitchNextSlide, swiper]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * userCards.length);

    if (swiper) {
      swiper?.slideTo(randomIndex, 0, false);
    }
    setIsHateEffect(false);
  }, [userCards, swiper]);

  const flirtingUserUids = userCards?.map((item: any) => item.uid) || [];

  const handleLike = () => {
    const likedUserUid = activeUserUids;
    const targetUid = likedUserUid || flirtingUserUids[0];
    openFlirtingModal(targetUid, swiper);
    console.log('activeUserUid', targetUid);
  };

  return (
    <div className="relative w-full">
      {isLoading ? (
        <SkeletonMain />
      ) : (
        <>
          <SlideEffect isHateEffect={isHateEffect} />
          <Swiper
            modules={[Navigation]}
            allowSlidePrev={false}
            spaceBetween={30}
            slidesPerView={1}
            onSlideChange={(swiper: any) => {
              handleSlideChange(swiper);
            }}
            onSwiper={(swiper: any) => {
              setSwiper(swiper);
            }}
            className="!px-[1.5rem] !pb-[2rem]"
            navigation={true}
            touchRatio={1}
            loop={true}
            loopAdditionalSlides={1}
            allowTouchMove={false}
          >
            {userCards?.map((item: any) => (
              <SwiperSlide
                className="min-[320px]:min-h-[29rem] min-[414px]:min-h-[34rem] min-[1200px]:min-h-[36rem] min-[390px]:min-h-[33rem] transform perspective-800 rotateY-0 transform-style-preserve-3d"
                key={item.uid}
              >
                <UserCard
                  age={item.age}
                  name={item.name}
                  interest={item.interest}
                  avatar={item.avatar}
                  flirtingUserUid={item.uid}
                  height={item.height}
                  gender={item.gender}
                  mbti={item.mbti}
                  isFlipped={isFlipped}
                  setIsFlipped={setIsFlipped}
                  userImg={item.user_img}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex gap-3 px-[20px] justify-between gap-x-2 mt-4">
            <SlideButton
              nextCard={() => {
                firstNextSlide();
                if (swiper) {
                  swiper.slideNext();
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
              <Image src="/assets/button/heart-white.png" width={20} height={20} alt="heart" />{' '}
              <span className="text-white text-[18px] leading-[20px] font-semibold">어필하기</span>
            </Button>
          </div>
        </>
      )}
      {flirtingModal()}
      {AlertModal()}
    </div>
  );
}

export default FetchUserCards;
