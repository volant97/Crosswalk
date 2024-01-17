'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType } from '@/types/registerType';
import { getAllData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import ProfileCard from './ProfileCard';
import { registerState } from '@/recoil/register';

function FetchUserProfile() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const [getUid, setGetUid] = useRecoilState(isUserState);
  const myUid = getUid.uid;
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const myGender = registerData.gender;
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
      let repeatedUserCards: any = [];
      const repeatCount = 6; // 임시방편 무한루프

      for (let i = 0; i < repeatCount; i++) {
        repeatedUserCards = repeatedUserCards.concat(userCards);
      }

      setUserCards(repeatedUserCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };
  useEffect(() => {
    getUerCards();
  }, []);

  useEffect(() => {
    localStorage.setItem('sliderIndex', currentIndex.toString());
  }, [currentIndex]);

  const filteredCards = userCards?.filter((item) => item.uid !== myUid && item.gender !== myGender);

  return (
    <div className="flex overflow-y-auto scrollbar-hide overflow-x-hidden h-[36rem] rounded-[1.5rem]">
      {filteredCards?.map((item: any, index) => {
        return (
          <div
            key={index}
            className={`transform transition-transform ease-in-out duration-300`}
            style={{ transform: `translateX(${-currentIndex * 100}%)` }}
          >
            <ProfileCard
              key={item.uid}
              age={item.age}
              name={item.name}
              interest={item.interest}
              avatar={item.avatar}
              flirtingUserUid={item.uid}
              height={item.height}
              gender={item.gender}
              mbti={item.mbti}
              nextCardBtn={handleNext}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FetchUserProfile;
