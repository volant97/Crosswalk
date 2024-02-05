import Image from 'next/image';
import React, { Fragment, useEffect } from 'react';

type Props = {
  age: number | null;
  avatar: number | null;
  name: string | null;
  interest: string[] | null;
  height: number | null;
  gender: string | null;
  mbti: string | null;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
  userImg: string | null;
  isClickedIndex: number | null;
  index: number;
};

const border =
  'border-2 border-solid border-white text-white px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem] h-[24px] ';

function UserCard({
  age,
  avatar,
  name,
  interest,
  height,
  gender,
  mbti,
  isFlipped,
  userImg,
  setIsFlipped,
  isClickedIndex,
  index
}: Props) {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    // console.log(flirtingUserUid);
  };

  useEffect(() => {
    setIsFlipped(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userImg) return;

  return (
    <>
      <div className={`card ${isFlipped && isClickedIndex === index ? 'flipped' : ''}`} onClick={handleClick}>
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
                  {interest?.map((item, index) => {
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
        <div className={`card-back ${isFlipped && isClickedIndex === index ? '' : 'hidden'} `}>
          <div className="cursor-pointer relative w-full aspect-[2/3] overflow-hidden rounded-[24px]">
            {/* Image 아바타 mt-[15px ]추가함 */}
            <Image
              className="rounded-[1.5rem] blur-[12px] opacity-60 mt-[15px] object-cover card-back-img "
              src={userImg}
              alt="유저 이미지"
              fill
            />
            {/* <p className="text-customRed text-[90px] font-extrabold rotate-45 absolute top-[30%] right-[88%] ">
              ::SCERET::
            </p> */}
            <div className="absolute flex flex-col gap-[10px] bottom-[100px] left-[20px]">
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
                        className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[24px] leading-[13px] bg-gray-800 bg-opacity-10"
                      >
                        {item}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="absolute flex flex-col justify-end gap-[8px] w-full h-full my-[1.5rem] pb-[50px]">
              <h1 className="text-[18px] leading-[18px] font-medium  ml-[20px]">기본정보</h1>
              <div className="flex flex-row gap-[0.25rem] h-[26px] w-[270px]">
                <div
                  className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px]  bg-gray-800 bg-opacity-10 ml-[20px]`}
                >
                  {height}cm
                </div>
                <div
                  className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px]  rounded-[20px] border-[1px]  bg-gray-800 bg-opacity-10`}
                >
                  {gender === 'M' ? '남자' : '여자'}
                </div>
                <div
                  className={`${border} flex justify-center items-center px-[12px] py-[4px]  text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px]  bg-gray-800 bg-opacity-10`}
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
          object-fit: cover;
        }
      `}</style>
    </>
  );
}

export default UserCard;
