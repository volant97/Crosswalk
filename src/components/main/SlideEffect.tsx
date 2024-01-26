'use client';

import Image from 'next/image';
import React from 'react';
import passImg from '@assets/hate/pass.png';

type Props = {
  isHateEffect: boolean;
};

function SlideEffect({ isHateEffect }: Props) {
  return (
    <>
      {isHateEffect === true && (
        <>
          <div className="absolute w-full h-full flex justify-center items-center">
            <Image className="absolute top-[220px]  z-10" src={passImg} width={300} height={300} alt="거절" />
          </div>
        </>
      )}
    </>
  );
}

export default SlideEffect;
