'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { getUnMatchedData } from '@/lib/api/SupabaseApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../Button';
import { userState } from '@/recoil/user';
import useFlirtingModal from '../common/modal/FlirtingModal';
import SlideButton from '../SlideButton';
import useAlertModal from '../common/modal/AlertModal';
import Image from 'next/image';
import SlideEffect from './SlideEffect';
import SkeletonMain from './SkeletonMain';
import { Spacer } from '@nextui-org/react';
import { nextSlideState } from '@/recoil/nextSlide';
import { useRouter } from 'next/navigation';
import type { unMatchedDataType } from '@/types/registerType';

// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

function UserCards() {
  const [userCards, setUserCards] = useState<any[]>([]);
  const [userUids, setUserUids] = useState<string[]>([]);
  const [activeUserUids, setActiveUserUids] = useState<string>('');
  const [swiper, setSwiper] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHateEffect, setIsHateEffect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClickedIndex, setIsClickedIndex] = useState<number | null>(null);

  const [isSwitchNextSlide, setIsSwitchNextSlide] = useRecoilState(nextSlideState);
  const registerData = useRecoilValue(userState);
  const myGender = registerData?.profile?.gender;
  const myUid = registerData?.profile?.uid;

  const router = useRouter();

  const { openModal, AlertModal } = useAlertModal();
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserCards = async () => {
    try {
      if (!myUid) return;
      if (!myGender) return;
      // setIsLoading(true);
      const fetchedUserCards = await getUnMatchedData(myUid, myGender);
      if (!fetchedUserCards) return;

      setUserCards(fetchedUserCards);
      const uids = fetchedUserCards?.map((item) => item.uid);
      setUserUids(uids);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      openModal('불러오는 도중 문제가 발생하였습니다.');
    }
  };

  const handleSlideChange = (swiper: SwiperClass) => {
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

  const flirtingUserUids = userCards?.map((item: unMatchedDataType) => item.uid) || [];

  const handleLike = () => {
    const likedUserUid = activeUserUids;
    const targetUid = likedUserUid || flirtingUserUids[0];
    openFlirtingModal(targetUid, swiper);
  };

  const firstNextSlide = () => {
    swiper.slideTo(1, 400, false);
  };

  const handleCardClick = (index: number) => {
    setIsClickedIndex(index);
  };

  useEffect(() => {
    getUserCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData]);

  useEffect(() => {
    if (activeUserUids && isSwitchNextSlide === true && swiper) {
      swiper.slideNext();
      setIsHateEffect(false);
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

  if (!myGender) {
    router.push('/');
  }

  return (
    <div className="relative w-full scale-[88%]">
      {/* 
    PWA용
    <div className="relative w-full"> */}
      {isLoading ? (
        <SkeletonMain />
      ) : (
        <div className="py-[30px] px-[24px] flex flex-col justify-center h-[calc(100dvh-9dvh-8.5dvh)]">
          <div>
            <SlideEffect isHateEffect={isHateEffect} />
            <Swiper
              modules={[Navigation]}
              allowSlidePrev={false}
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={(swiper: SwiperClass) => {
                handleSlideChange(swiper);
              }}
              onSwiper={(swiper: SwiperClass) => {
                setSwiper(swiper);
              }}
              className="flex px-[1.5rem] py-[2rem] border-[5px] border-white"
              navigation={true}
              touchRatio={1}
              loop={true}
              loopAdditionalSlides={1}
              allowTouchMove={false}
            >
              {userCards?.map((item: unMatchedDataType, index: number) => (
                <SwiperSlide
                  className="min-[320px]:min-h-[29rem] min-[414px]:min-h-[34rem] min-[1200px]:min-h-[36rem] min-[390px]:min-h-[33rem] transform perspective-800 rotateY-0 transform-style-preserve-3d"
                  key={item.uid}
                  onClick={() => handleCardClick(index)}
                >
                  <UserCard
                    age={item.age}
                    name={item.name}
                    interest={item.interest}
                    avatar={item.avatar}
                    height={item.height}
                    gender={item.gender}
                    mbti={item.mbti}
                    isFlipped={isFlipped}
                    setIsFlipped={setIsFlipped}
                    userImg={item.user_img}
                    isClickedIndex={isClickedIndex}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Spacer y={1} />
          <div className="flex gap-3 justify-between gap-x-2 px-[5px]">
            <SlideButton
              nextCard={() => {
                firstNextSlide();
                if (swiper) {
                  swiper.slideNext();
                }
              }}
              color="default"
              size="lg"
              disabled={false}
            >
              <Image src="/assets/figmaImg/nothanks.png" width={16} height={16} alt="no thanks" />{' '}
              <p className="text-gray-666">괜찮아요</p>
            </SlideButton>

            <Button
              openFlirtingModal={() => {
                handleLike();
              }}
              color="green"
              size="lg"
              disabled={false}
            >
              <Image src="/assets/button/heart-white.png" width={20} height={20} alt="heart" />{' '}
              <span className="text-white text-[18px] leading-[20px] font-semibold">어필하기</span>
            </Button>
          </div>
        </div>
      )}
      {flirtingModal()}
      {AlertModal()}
    </div>
  );
}

export default UserCards;
