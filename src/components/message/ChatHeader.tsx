import Image from 'next/image';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

function ChatHeader() {
  return (
    <div className="flex items-center gap-[0.75rem] absolute top-[10px] left-[70px]">
      <div>
        <Image
          src="/assets/avatar/avatar0.png"
          className="rounded-full w-[2.5rem] h-[2.5rem]"
          width={100}
          height={50}
          alt="아바타 이미지"
        />
      </div>
      <div>
        <h1>홍길동</h1>
        <div className="flex gap-[0.25rem] items-center mt-[-5px]">
          <Image src="/assets/figmaImg/Heart.png" className="w-[1rem] h-[1rem]" width={50} height={50} alt="호감도" />
          <h1 className="text-[0.875rem] text-gray-888">10%</h1>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
