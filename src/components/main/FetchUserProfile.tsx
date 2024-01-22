'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType, unMatchedDataType } from '@/types/registerType';
import { getAllData, getUnMatchedData } from '@/lib/api/SupabaseApi';
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
  const searchParams = useSearchParams();
  const [userCards, setUserCards] = useState<(unMatchedDataType | any)[]>([]);
  const [getUid, setGetUid] = useRecoilState(userState);
  const myUid = getUid?.id;
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myGender = registerData?.profile?.gender;
  const index = Number(searchParams.get('index') || 0);

  const getUerCards = async () => {
    try {
      if (!myUid) return;
      if (!myGender) return;
      const userCards = await getUnMatchedData(myUid, myGender);
      if (!userCards) return;
      setUserCards(userCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };
  useEffect(() => {
    getUerCards();
  }, []);

  const filteredCards = userCards?.find((item) => item?.uid == userId);
  const filteredCardslength = userCards?.length;

  return (
    <div className="w-full px-[1.5rem] py-[2rem]">
      <ProfileCard
        index={filteredCardslength}
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
