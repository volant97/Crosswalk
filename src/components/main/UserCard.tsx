import Image from 'next/image';
import React, { Fragment } from 'react';
import FlirtingModal from '../common/modal/FlirtingModal';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { currentIndexState } from '@/recoil/currentIndex';

type Props = {
  age: number;
  avatar: string;
  name: string;
  interest: string[];
  flirtingUserUid: string;
  index: number;
};

function UserCard({ age, avatar, name, interest, flirtingUserUid, index }: Props) {
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  return (
    <Link href={`/main/${flirtingUserUid}?index=${currentIndex}`}>
      <div className="relative">
        <div className="relative w-full aspect-[2/3]">
          <Image
            className="rounded-[1.5rem]"
            src={`/assets/avatar/avatar${avatar}.png`}
            alt="유저 아바타 이미지"
            fill
          />
        </div>
        <div className="absolute flex flex-col gap-[10px] bottom-[27px] left-[20px]">
          <div className="flex items-end w-full gap-[4px]">
            <h1 className="text-[24px] font-bold leading-[24px]">{name}</h1>
            <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium">{age}</h2>
          </div>
          <div className="flex flex-warp w-full items-center gap-[4px] ">
            {interest?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div
                    key={index}
                    className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px]"
                  >
                    {item}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
