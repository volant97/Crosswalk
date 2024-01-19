import Image from 'next/image';
import React, { Fragment } from 'react';
import FlirtingModal from '../common/modal/FlirtingModal';
import Link from 'next/link';

type Props = {
  age: number;
  avatar: string;
  name: string;
  interest: string[];
  flirtingUserUid: string;
};

function UserCard({ age, avatar, name, interest, flirtingUserUid }: Props) {
  return (
    <div className="relative">
      <Link href={`/main/${flirtingUserUid}`}>
        <div className="relative w-full aspect-[2/3]">
          <Image
            className="rounded-[1.5rem]"
            src={`/assets/avatar/avatar${avatar}.png`}
            alt="유저 아바타 이미지"
            fill
          />
        </div>
      </Link>
      <div className="flex items-center w-full h-[24px] absolute bottom-[40px] px-[20px] mb-[10px] gap-[5px]">
        <h1 className="text-[24px] font-bold leading-[24px]">{name}</h1>
        <h2 className="h-[16px] text-[16px] absolute bottom-0 left-[68px] mb-[2px] ml-[1px] leading-[16px] pt-[1px] font-medium">
          {age}
        </h2>
      </div>
      <div className="flex flex-warp w-full items-center gap-[5px] absolute bottom-[20px] px-[20px]">
        {interest?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                key={index}
                className="flex items-center justify-center text-center border-[1px] border-solid border-white px-[4px] py-[10px] text-white  rounded-[1rem] text-[13px] font-medium h-[20px] w-[43px]"
              >
                {item}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default UserCard;
