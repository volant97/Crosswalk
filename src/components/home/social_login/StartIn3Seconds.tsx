import React from 'react';
import Image from 'next/image';
import rocket from '@assets/login/rocket.png';

function StartIn3Seconds() {
  return (
    <div className="flex items-center gap-[4px]">
      <div className="w-[40px] h-[1px] bg-gray-E6" />
      <div className="flex justify-center items-center gap-[4px] w-[120px]">
        <div className="text-center font-pretendard text-[13px] font-[500] leading-[24px] tracking-[-0.4px] capitalize">
          3초만에 시작하기
        </div>
        <div className="relative w-[20px] h-[20px]">
          <Image src={rocket} alt="rocket" width={20} height={20} />
        </div>
      </div>
      <div className="w-[40px] h-[1px] bg-gray-E6" />
    </div>
  );
}

export default StartIn3Seconds;
