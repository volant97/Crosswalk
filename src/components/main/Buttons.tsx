import React from 'react';
import Image from 'next/image';
import SlideButon from '../SlideButton';
import Button from '../Button';

type Props = {
  firstNextSlide: () => void;
  swiper: any;
  handleLike: () => void;
};

function Buttons({ firstNextSlide, swiper, handleLike }: Props) {
  return (
    <div className="flex gap-3 justify-between gap-x-2 px-[5px]">
      <SlideButon
        nextCard={() => {
          firstNextSlide();
          if (swiper) {
            swiper.slideNext();
          }
        }}
        color="default"
        size="lg"
        disabled={false}
      >
        <Image src="/assets/figmaImg/nothanks.png" width={16} height={16} alt="no thanks" />{' '}
        <p className="text-gray-666">괜찮아요</p>
      </SlideButon>

      <Button
        openFlirtingModal={() => {
          handleLike();
        }}
        color="green"
        size="lg"
        disabled={false}
      >
        <Image src="/assets/button/heart-white.png" width={20} height={20} alt="heart" />{' '}
        <span className="text-white text-[18px] leading-[20px] font-semibold">어필하기</span>
      </Button>
    </div>
  );
}

export default Buttons;
