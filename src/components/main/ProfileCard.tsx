import Image from 'next/image';
import React, { Fragment } from 'react';
import FlirtingModal from '../common/modal/FlirtingModal';
import Button from '../Button';
import { IoClose } from 'react-icons/io5';
import { GoHeartFill } from 'react-icons/go';
import useFlirtingModal from '../common/modal/FlirtingModal';
import SlideButon from '../SlideButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentIndexState } from '@/recoil/currentIndex';
import useReloadCardModal from '../common/modal/ReloadCardModal';

const tags = ['음악', '여행', '맛집'];

const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

type Props = {
  age: number;
  avatar: number;
  name: string;
  interest: string[];
  height: number;
  gender: string;
  mbti: string;
  flirtingUserId: any;
  index: any;
};

function ProfileCard({ age, avatar, name, interest, height, flirtingUserId, gender, mbti, index }: Props) {
  const router = useRouter();
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const { openReloadCardModal, reloadCardModal } = useReloadCardModal();
  console.log('index', index);

  const handleLike = () => {
    // openFlirtingModal(flirtingUserId);
    console.log('userId', flirtingUserId);
  };
  return (
    <div className="relative">
      <div className="relative">
        <div className="relative">
          <div className="relative w-full aspect-[2/3]">
            <Image
              className="rounded-t-[1.5rem]"
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
      </div>
      <div className="flex flex-col  h-[11.5rem] w-full rounded-b-[1.5rem] bg-customGreen2  px-[1.25rem]">
        <div className="flex flex-col gap-[8px] my-[1.5rem] h-[52px]">
          <h1 className="text-[18px] leading-[18px] font-medium ">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px]">
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {height}cm
            </div>
            <div
              className={`${border} px-[12px] py-[4px] flex justify-center items-center text-[14px] font-medium leading-[14px]  rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {gender === 'M' ? '남자' : '여자'}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[52px] ">
          <h1 className="text-[18px] leading-[18px] font-medium">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] h-[26px] mt-[0.5rem] ">
            <div
              className={`${border} flex justify-center items-center px-[12px] py-[4px]  text-[14px] font-medium leading-[14px] rounded-[20px] border-[1px] bg-customGreen2`}
            >
              {mbti}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3  justify-between w-full">
        <SlideButon
          nextCard={() => {
            router.push(`/main?i=${currentIndex + 1}`);
            // if (currentIndex === index - 1) {
            //   // openReloadCardModal('마지막 카드입니다. 다시 처음으로 돌아갑니다!');

            //   setCurrentIndex(0);
            //   router.push(`/main`);
            // }
          }}
          color="default"
          size="md"
        >
          <IoClose size={20} /> 괜찮아요
        </SlideButon>
        <Button
          openFlirtingModal={() => {
            handleLike();
          }}
          color="green"
          size="md"
        >
          <Image src="/assets/button/heart.png" width={20} height={20} alt="heart" />
          <span className="text-white text-[18px] leading-[20px] font-semibold">어필하기</span>
        </Button>
      </div>
      {flirtingModal()}
      {reloadCardModal()}
    </div>
  );
}

export default ProfileCard;
