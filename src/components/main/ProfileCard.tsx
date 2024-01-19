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

const tags = ['음악', '여행', '맛집'];

const border = 'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem]';

type Props = {
  age: number | null | undefined;
  avatar: number | null | undefined;
  name: string | null | undefined;
  interest: string[] | null | undefined;
  height: number | null | undefined;
  gender: string | null | undefined;
  mbti: string | null | undefined;
  flirtingUserId: any;
};

function ProfileCard({ age, avatar, name, interest, height, flirtingUserId, gender, mbti }: Props) {
  const router = useRouter();
  const { openFlirtingModal, flirtingModal } = useFlirtingModal();
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);

  const handleLike = () => {
    openFlirtingModal(flirtingUserId, currentIndex);
    console.log('userId', flirtingUserId);
  };
  return (
    <div>
      <div className="relative">
        <div className="relative w-full aspect-[2/3]">
          <Image
            className="rounded-t-[1.5rem]"
            src={`/assets/avatar/avatar${avatar}.png`}
            alt="유저 아바타 이미지"
            fill
          />
        </div>
        <div className="flex items-center gap-[5px] absolute bottom-[3.75rem] px-[1.4rem]">
          <h1 className="text-[1.375rem] font-semibold">{name}</h1>
          <h2 className="font-medium">{age}</h2>
        </div>
        <div className="flex flex-warp w-full items-center gap-[5px] absolute bottom-[1.8rem] px-[1.4rem]">
          {interest?.map((item, index) => {
            return (
              <Fragment key={index}>
                <div
                  key={index}
                  className="border-[2px] border-solid border-white px-[0.63rem] py-[0.25rem] text-white bg-slate-300/50 rounded-[1rem] text-[0.8125rem] font-semibold"
                >
                  {item}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col  h-[11.5rem] w-full rounded-b-[1.5rem] bg-customGreen2  px-[1.25rem]">
        <div className="mb-[1.5rem] my-[1.5rem] h-[2.875rem]">
          <h1 className="textgray-999">기본정보</h1>
          <div className="flex flex-row gap-[0.25rem]">
            <div className={`${border}`}>{height}cm</div>
            <div className={`${border}`}>{gender === 'M' ? '남자' : '여자'}</div>
          </div>
        </div>
        <div className="h-[2.875rem] mb-[1.5rem]">
          <h1 className="text-slate-400">MBTI</h1>
          <div className="flex flex-row gap-[0.25rem] mt-[0.5rem]">
            <div className={`${border}`}>{mbti}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 px-[20px] flex justify-between gap-x-2">
        <SlideButon
          nextCard={() => {
            router.push(`/main?i=${currentIndex + 1}`);
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
          <GoHeartFill size={20} /> 어필하기
        </Button>
      </div>
      {flirtingModal()}
    </div>
  );
}

export default ProfileCard;
