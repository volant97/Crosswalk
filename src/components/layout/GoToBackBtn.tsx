'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

function GoToBackBtn() {
  const route = useRouter();

  const goToBack = () => {
    route.back();
  };

  return (
    <button className="absolute left-4" onClick={goToBack}>
      <Image
        src="/assets/figmaImg/arrow.png"
        alt="뒤로가기 화살표"
        width={24}
        height={24}
        className="left-0 cursor-pointer"
      />
    </button>
  );
}

export default GoToBackBtn;
