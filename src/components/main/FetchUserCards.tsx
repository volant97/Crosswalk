'use client';

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import type { RegisterType } from '@/types/registerType';
import { getAllData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';

function FetchUserCards() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const getUid = useRecoilState(isUserState);
  const myUid = getUid[0].uid;
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem('sliderIndex');
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  const totalCards = userCards.length;
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const getUerCards = async () => {
    try {
      const userCards = await getAllData();
      console.log('userCards:', userCards);
      setUserCards(userCards);
      console.log(userCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };
  useEffect(() => {
    getUerCards();
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('sliderIndex', currentIndex.toString());
  }, [currentIndex]);

  return (
    <div className="flex">
      {userCards
        ?.filter((itme: any) => itme.uid !== myUid)
        ?.map((item: any, index) => {
          return (
            <div
              key={index}
              className={`transform transition-transform ease-in-out duration-300`}
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              <UserCard
                key={item.uid}
                age={item.age}
                name={item.name}
                interest={item.interest}
                avatar={item.avatar}
                flirtingUserUid={item.uid}
                nextCardBtn={handleNext}
              />
            </div>
          );
        })}
    </div>
  );
}

export default FetchUserCards;
