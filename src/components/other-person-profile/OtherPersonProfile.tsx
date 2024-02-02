/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { getOtherPersonCustomUsers } from '@/lib/api/otherPersonProfile';
import { supabase } from '@/lib/supabase-config';
import { userState } from '@/recoil/user';
import { getSoulmateStatus } from '@/types/etcType';
import { unNullRegisterType } from '@/types/registerType';
import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  otherPersonId: string;
};

function OtherPersonProfile({ otherPersonId }: Props) {
  const [otherProfile, setOtherProfile] = useState<unNullRegisterType>();
  const otherId = otherProfile?.uid;

  const [isSoulmate, setIsSoulmate] = useState<boolean>(false);
  const [checkSoulmate, setCheckSoulmate] = useState<boolean>(false);
  const register = useRecoilValue(userState);

  const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

  const getSenderInfo = async () => {
    try {
      const OtherPersonCustomUsersData = await getOtherPersonCustomUsers(otherPersonId);
      setOtherProfile(OtherPersonCustomUsersData);

      const { data, error } = await supabase
        .from('flirting_list')
        .select('sender_uid, receiver_uid, status')
        .eq('status', 'SOULMATE')
        .returns<getSoulmateStatus[]>();

      if (data?.length) {
        data.forEach((item) => {
          if (!otherId) return;
          if (item.receiver_uid !== otherId && item.sender_uid !== otherId) return setCheckSoulmate(true);
          // console.log('여기', item.receiver_uid === otherId || item.sender_uid === otherId);
          if (item.receiver_uid === otherId || item.sender_uid === otherId) {
            setIsSoulmate(true);
            return setCheckSoulmate(true);
          } else {
            setIsSoulmate(false);
            return setCheckSoulmate(true);
          }
        });
      } else {
        setIsSoulmate(false);
        return setCheckSoulmate(true);
      }

      if (error) return console.error('status 가져오기 에러 : ', error);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    getSenderInfo();
  }, [otherProfile?.uid]);

  return (
    <div className="w-full px-[24px] py-[32px]">
      <div>
        <div className="relative ">
          <div className="relative w-full rounded-t-[24px] aspect-[2/3]">
            {otherId && checkSoulmate ? (
              isSoulmate ? (
                // 최종매칭 O
                <Fragment>
                  <Image
                    className="rounded-t-[24px] object-cover"
                    src={otherProfile?.user_img}
                    alt="유저 이미지"
                    fill
                  />
                  <p className="absolute z-10 right-[20px] bottom-[28px] flex items-center justify-center py-[4px] px-[10px] text-center text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px]  bg-customGreen3 ">
                    소울메이트
                  </p>
                  <div className="absolute flex items-end w-full h-full">
                    <div className="w-full h-[150px] bg-gradient-to-t from-black/[20%] to-black/[0%]"></div>
                  </div>
                </Fragment>
              ) : (
                // 최종매칭 X
                <Image
                  className="rounded-t-[24px]"
                  src={`/assets/avatar/avatar${otherProfile?.avatar}.png`}
                  alt="유저 아바타 이미지"
                  fill
                />
              )
            ) : (
              <Skeleton className="w-full h-full rounded-t-[24px]" />
            )}
          </div>
          <div className="absolute flex flex-col gap-[10px] bottom-[27px] left-[20px]">
            <div className="flex items-end w-full gap-[4px] ">
              <h1 className="text-[24px] font-bold leading-[24px] text-white">{otherProfile?.name}</h1>
              <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium text-white">{otherProfile?.age}</h2>
            </div>
            <div className="flex flex-warp w-full items-center gap-[4px] ">
              {otherProfile?.interest?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      key={index}
                      className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px]  bg-black bg-opacity-10"
                    >
                      {item}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] w-full  bg-customGreen2 px-[20px] py-[24px] rounded-b-[24px] ">
        <div className="flex flex-col gap-[8px] h-[52px]">
          <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem]">
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {otherProfile?.height}cm
            </div>
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {otherProfile?.gender === 'M' ? '남자' : '여자'}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[52px] ">
          <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] mt-[0.5rem] ">
            <div
              className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
            >
              {otherProfile?.mbti}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherPersonProfile;
