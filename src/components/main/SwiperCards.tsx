import React from 'react';
import UserCard from './UserCard';

import SlideEffect from './SlideEffect';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import type { unMatchedDataType } from '@/types/registerType';

type Props = {
  isFlipped: boolean;
  isClickedIndex: number | null;
  setIsFlipped: (isFlipped: boolean) => void;
  isHateEffect: boolean;
  handleSlideChange: (swiper: SwiperClass) => void;
  setSwiper: (value: any) => void;
  userCards: any[];
  handleCardClick: (index: number) => void;
};

function SwiperCards({
  isFlipped,
  isClickedIndex,
  setIsFlipped,
  isHateEffect,
  handleCardClick,
  handleSlideChange,
  setSwiper,
  userCards
}: Props) {
  return (
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
  );
}

export default SwiperCards;
