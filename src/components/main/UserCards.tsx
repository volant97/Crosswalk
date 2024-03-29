/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { nextSlideState } from '@/recoil/nextSlide';
import { getUnMatchedData } from '@/lib/api/SupabaseApi';
import useFlirtingModal from '../common/modal/FlirtingModal';
import useAlertModal from '../common/modal/AlertModal';
import Buttons from './Buttons';
import { SwiperClass } from 'swiper/react';
import SwiperCards from './SwiperCards';
import SkeletonMain from './SkeletonMain';
import { Spacer } from '@nextui-org/react';
import type { unMatchedDataType } from '@/types/registerType';

function UserCards() {
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();

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

  const getUserCards = async () => {
    try {
      if (!myUid) return;
      if (!myGender) return;
      const fetchedUserCards = await getUnMatchedData(myUid, myGender);
      if (!fetchedUserCards) return;

      setUserCards(fetchedUserCards);
      const uids = fetchedUserCards?.map((item) => item.uid);
      setUserUids(uids);
      setIsLoading(false);
    } catch (error) {
      console.error('유저카드를 불러오는 도중 문제가 발생하였습니다.', error);
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
    // Todo : PWA scale-[100%]
    <div className="relative w-full h-full scale-[88%]">
      {isLoading ? (
        <SkeletonMain />
      ) : (
        <div className="py-[30px] px-[24px] flex flex-col justify-center h-[calc(100dvh-9dvh-8.5dvh)]">
          <SwiperCards
            isFlipped={isFlipped}
            isClickedIndex={isClickedIndex}
            setIsFlipped={setIsFlipped}
            isHateEffect={isHateEffect}
            handleCardClick={handleCardClick}
            handleSlideChange={handleSlideChange}
            setSwiper={setSwiper}
            userCards={userCards}
          />
          <Spacer y={1} />
          <Buttons firstNextSlide={firstNextSlide} swiper={swiper} handleLike={handleLike} />
        </div>
      )}
      {flirtingModal()}
      {AlertModal()}
    </div>
  );
}

export default UserCards;
