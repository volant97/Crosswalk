'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType } from '@/types/registerType';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import MyCard from './MyCard';
import { registerState } from '@/recoil/register';

function FetchMyProfileCard() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const [registerData, setRegisterData] = useRecoilState(registerState);
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

  async function updateData() {
    try {
      await postRegister(registerData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (registerData) {
      updateData();
    }
    getUerCards();
  }, [registerData]);

  return (
    <div className="flex overflow-y-auto scrollbar-hide h-[36rem] rounded-[1.5rem]">
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
