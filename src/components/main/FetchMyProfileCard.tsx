'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType } from '@/types/registerType';
import { getAllData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import MyCard from './MyCard';

function FetchMyProfileCard() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const getUid = useRecoilState(isUserState);
  const myUid = getUid[0].uid;

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
  }, []);

  return (
    <div className="flex overflow-y-auto scrollbar-hide h-[36rem]">
      {userCards
        ?.filter((itme: any) => itme.uid === myUid)
        ?.map((item: any, index) => {
          return (
            <div key={index}>
              <MyCard
                age={item.age}
                name={item.name}
                interest={item.interest}
                avatar={item.avatar}
                height={item.height}
                mbti={item.mbti}
                gender={item.gender}
              />
            </div>
          );
        })}
    </div>
  );
}

export default FetchMyProfileCard;
