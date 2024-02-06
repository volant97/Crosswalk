/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import MyCard from './MyCard';
import type { RegisterType } from '@/types/registerType';

function MyProfile() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const registerData = useRecoilValue(userState);
  const myUid = registerData?.profile?.uid;
  const userInfo = registerData?.profile;

  const getUerCards = async () => {
    try {
      const userCards = await getAllData();
      setUserCards(userCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };

  async function updateData() {
    try {
      await postRegister(myUid, userInfo);
    } catch (error) {
      console.error(error);
    }
  }
  const updateProfile = async () => {
    if (registerData) {
      await updateData();
      await getUerCards();
    }
  };

  useEffect(() => {
    updateProfile();
  }, [registerData]);

  return (
    <div className="w-full px-[24px] py-[32px]">
      {userCards
        ?.filter((itme: RegisterType) => itme.uid === myUid)
        ?.map((item: RegisterType, index: number) => {
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

export default MyProfile;
