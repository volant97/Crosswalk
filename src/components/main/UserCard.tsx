import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';

type Props = {
  age: number;
  avatar: string;
  name: string;
  interest: string[];
  flirtingUserUid: string;
  height: number;
  gender: string;
  mbti: string;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
  userImg: string;
};

const border =
  'border-2 border-solid border-white text-white px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

function UserCard({
  age,
  avatar,
  name,
  interest,
  flirtingUserUid,
  height,
  gender,
  mbti,
  isFlipped,
  userImg,
  setIsFlipped
}: Props) {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    console.log(flirtingUserUid);
  };

  useEffect(() => {
    setIsFlipped(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        <div className={`relative card-front ${isFlipped ? 'hidden' : ''}`}>
          <div className="relative w-full aspect-[2/3]">
            <Image
              className="rounded-[1.5rem]"
              src={`/assets/avatar/avatar${avatar}.png`}
              alt="유저 아바타 이미지"
              fill
            />
            <div className="absolute flex flex-col gap-[10px] bottom-4 left-[24px]">
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
                        className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px] bg-gray-800 bg-opacity-10"
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
        <div className={`card-back ${isFlipped ? '' : 'hidden'}`}>
          <div className="relative w-full aspect-[2/3]">
            <Image className="rounded-[1.5rem] blur-md" src={userImg} alt="유저 아바타 이미지" fill />
            <div className="absolute flex flex-col gap-[10px] bottom-[100px] left-[24px]">
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
                        className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[20px] leading-[13px] bg-gray-800 bg-opacity-10"
                      >
                        {item}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-[5px] flex flex-col gap-[8px] my-[1.5rem] h-[52px] left-[24px]">
              <h1 className="text-[18px] leading-[18px] font-medium ">기본정보</h1>
              <div className="flex flex-row gap-[0.25rem] h-[26px] w-[270px]">
                <div
                  className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px]`}
                >
                  {height}cm
                </div>
                <div
                  className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px]  rounded-[20px] border-[1px]`}
                >
                  {gender === 'M' ? '남자' : '여자'}
                </div>
                <div
                  className={`${border} flex justify-center items-center px-[12px] py-[4px]  text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px]`}
                >
                  {mbti}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          transition: transform 0.7s;
        }

        .flipped {
          transform: perspective(800px) rotateY(180deg);
        }

        .flipped .card-back {
          display: block;
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default UserCard;
