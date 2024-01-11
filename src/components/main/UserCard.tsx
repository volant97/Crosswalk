import Image from 'next/image';
import React from 'react';
import test_avatar from '@assets/avatar/avatar1.jpg';
import FlirtingModal from '../common/modal/FlirtingModal';

const tags = ['게임'];

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
      <div className=" flex justify-center itmes-center w-[20rem] h-[35rem]">
        <Image
          className="rounded-[1.5rem]"
          src={`/assets/avatar/avatar1.jpg`}
          width={300}
          height={300}
          alt="유저 아바타 이미지"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="flex items-center gap-[5px] absolute bottom-[3.75rem] px-[1.4rem]">
        <h1 className="text-[1.375rem] font-semibold">{name}</h1>
        <h2 className="font-medium">{age}</h2>
      </div>
      <div className="flex flex-warp items-center gap-[5px] absolute bottom-[1.8rem] px-[1.4rem]">
        {tags.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="border-[2px] border-solid border-white px-[0.63rem] py-[0.25rem] text-white bg-slate-300/50 rounded-[1rem] text-[0.8125rem] font-semibold"
              >
                {item}
              </div>
              <FlirtingModal flirtingUserUid={flirtingUserUid} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default UserCard;
