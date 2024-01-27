import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import SlideButton from '../SlideButton';
import Button from '../Button';

export default function SkeletonMain() {
  return (
    <div className="py-[30px] px-[24px] flex flex-col gap-[30px] justify-center h-[calc(100dvh-9dvh-8.5dvh)]">
      <Skeleton className="rounded-[24px] w-full min-[320px]:min-h-[29rem] min-[414px]:min-h-[34rem] min-[1200px]:min-h-[36rem] px-[4px]"></Skeleton>

      <div className="w-full flex gap-2">
        {/* <Skeleton className="flex rounded-full w-full h-[50px]" />
        <Skeleton className="flex rounded-full w-full h-[50px" /> */}
        <SlideButton nextCard={() => {}} color="default" size="lg">
          <IoClose size={20} /> 괜찮아요
        </SlideButton>

        <Button openFlirtingModal={() => {}} color="green" size="lg">
          <Image src="/assets/button/heart-white.png" width={20} height={20} alt="heart" />{' '}
          <span className="text-white text-[18px] leading-[20px] font-semibold">어필하기</span>
        </Button>
      </div>
    </div>
  );
}
