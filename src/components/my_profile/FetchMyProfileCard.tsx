'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType } from '@/types/registerType';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import MyCard from './MyCard';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';
import Link from 'next/link';

function FetchMyProfileCard() {
  const [userCards, setUserCards] = useState<RegisterType[]>([]);
  const [registerData, setRegisterData] = useRecoilState(userState);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData]);

  return (
    <div className="w-full px-[24px] py-[32px]">
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
      {/* <Link href={'/customer-service/contact'}>
        <div className="flex justify-end mt-[10px] pr-[10px] cursor-pointer">
          <p className="text-gray-888">고객센터</p>
        </div>
      </Link> */}
    </div>
  );
}

export default FetchMyProfileCard;
