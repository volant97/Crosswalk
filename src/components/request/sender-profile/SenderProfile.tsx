/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { getSenderCustomUsers } from '@/lib/api/requestApi';
import { unNullRegisterType } from '@/types/registerType';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

type Props = {
  senderId: string;
};

function SenderProfile({ senderId }: Props) {
  const [senderInfo, setSenderInfo] = useState<unNullRegisterType>();

  const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

  const getSenderInfo = async () => {
    try {
      const data = await getSenderCustomUsers(senderId);
      setSenderInfo(data);
    } catch (error) {
      alert('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    getSenderInfo();
  }, []);

  return (
    <div className="w-full px-[24px] py-[32px]">
      <div>
        <div className="relative">
          <div className="w-full rounded-t-[24px] aspect-[2/3]">
            <Image
              className="rounded-t-[24px]"
              src={`/assets/avatar/avatar${senderInfo?.avatar}.png`}
              alt="유저 아바타 이미지"
              fill
            />
          </div>
          <div className="absolute flex flex-col gap-[10px] bottom-[27px] left-[20px]">
            <div className="flex items-end w-full gap-[4px]">
              <h1 className="text-[24px] font-bold leading-[24px]">{senderInfo?.name}</h1>
              <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium">{senderInfo?.age}</h2>
            </div>
            <div className="flex flex-warp w-full items-center gap-[4px] ">
              {senderInfo?.interest?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      key={index}
                      className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px]  bg-gray-800 bg-opacity-10"
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
      <div className="flex flex-col  h-[164px] w-full  bg-customGreen2  px-[1.25rem]">
        <div className="flex flex-col gap-[8px] my-[1.5rem] h-[52px]">
          <h1 className="text-[18px] leading-[18px] font-medium ">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px]">
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {senderInfo?.height}cm
            </div>
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px]  rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {senderInfo?.gender === 'M' ? '남자' : '여자'}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[52px] ">
          <h1 className="text-[18px] leading-[18px] font-medium">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px] mt-[0.5rem] ">
            <div
              className={`${border} flex justify-center items-center px-[12px] py-[4px]  text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {senderInfo?.mbti}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SenderProfile;
