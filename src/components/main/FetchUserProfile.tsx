'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType } from '@/types/registerType';
import { getAllData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import ProfileCard from './ProfileCard';

import 'swiper/css';
import { userState } from '@/recoil/user';
import { useSearchParams } from 'next/navigation';

type Props = {
  userId: string;
};

function FetchUserProfile({ userId }: Props) {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const [getUid, setGetUid] = useRecoilState(isUserState);
  const myUid = getUid.uid;
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myGender = registerData?.profile?.gender;
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => prevIndex + 1);
  // };

  const getUerCards = async () => {
    try {
      const userCards = await getAllData();
      setUserCards(userCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };
  useEffect(() => {
    getUerCards();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('sliderIndex', currentIndex.toString());
  // }, [currentIndex]);

  const filteredCards = userCards?.find((item) => item?.uid == userId && item.gender !== myGender);

  console.log('filteredCards', filteredCards);

  return (
    <div className="w-full px-[1.5rem] py-[2rem]">
      <ProfileCard
        key={filteredCards?.uid}
        age={filteredCards?.age}
        name={filteredCards?.name}
        interest={filteredCards?.interest}
        avatar={filteredCards?.avatar}
        height={filteredCards?.height}
        gender={filteredCards?.gender}
        mbti={filteredCards?.mbti}
        flirtingUserId={filteredCards?.uid}
      />
    </div>
  );
}

export default FetchUserProfile;
