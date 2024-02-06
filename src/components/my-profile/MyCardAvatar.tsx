import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  avatar: number | null;
};

function MyCardAvatar({ avatar }: Props) {
  return (
    <div className="relative w-full aspect-[2/3]">
      <Image className="rounded-t-[1.5rem]" src={`/assets/avatar/avatar${avatar}.png`} alt="유저 아바타 이미지" fill />
      <Link
        href="./my-profile/edit"
        className="w-[32px] h-[32px] flex justify-center items-center gap-[10px] rounded-[30px] bg-white bg-opacity-80 absolute right-[12px] top-[12px]"
      >
        <Image src="/assets/figmaImg/logout_pen.png" width={16} height={16} alt="edit my profile" className="" />
      </Link>
    </div>
  );
}

export default MyCardAvatar;
