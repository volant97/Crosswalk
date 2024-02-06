import React, { Fragment } from 'react';
import Image from 'next/image';

type Props = {
  isFlipped: boolean;
  isClickedIndex: number | null;
  index: number;
  avatar: number | null;
  age: number | null;
  name: string | null;
  interest: string[] | null;
};

function CardFornt({ isFlipped, isClickedIndex, index, avatar, age, name, interest }: Props) {
  return (
    <>
      <div className={`relative card-front ${isFlipped && isClickedIndex === index ? 'hidden' : ''}`}>
        <div className="flex items-center">
          <div className="cursor-pointer relative w-full aspect-[2/3]">
            <Image
              className="rounded-[1.5rem] object-cover"
              src={`/assets/avatar/avatar${avatar}.png`}
              alt="유저 아바타 이미지"
              fill
            />
            <Image
              className="border-black-4 absolute right-[15px] bottom-[15px]"
              src={'/assets/figmaImg/information.png'}
              alt="information"
              width={25}
              height={25}
            />
            <div className="absolute flex flex-col gap-[10px] bottom-[18px] left-[20px]">
              <div className="flex items-end w-full gap-[4px]">
                <h1 className="text-[24px] font-bold leading-[24px]">{name}</h1>
                <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium">{age}</h2>
              </div>
              <div className="flex flex-warp w-full items-center gap-[4px] ">
                {interest?.map((item: string, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div
                        key={index}
                        className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[24px] leading-[13px] bg-gray-800 bg-opacity-10"
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
      </div>
      <style jsx>{`
        .flipped {
          transform: perspective(800px) rotateY(180deg);
        }

        .card-front {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  );
}

export default CardFornt;
