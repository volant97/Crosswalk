'use client';

import Image from 'next/image';
import React from 'react';
import hateImg from '@assets/hate/hate.png';

type Props = {
  isHateEffect: boolean;
};

function SlideEffect({ isHateEffect }: Props) {
  return (
    <>
      {isHateEffect === true && (
        <>
          <div className="relative w-full h-full flex justify-center items-center">
            <Image className="absolute top-[220px]  z-10" src={hateImg} width={100} height={100} alt="거절" />
          </div>
        </>
      )}
    </>
  );
}

export default SlideEffect;
