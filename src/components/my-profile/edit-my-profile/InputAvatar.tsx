import Image from 'next/image';
import React from 'react';

type Props = {
  avatar: number;
  gender: string;
  updateGender: (gender: string) => number;
};

function InputAvatar({ avatar, gender, updateGender }: Props) {
  return (
    <div className="absolute top-[-70px] flex justify-center items-center h-[100px] w-[100px] z-2">
      <div className="relative h-[100px] w-[100px] bg-gray-EF rounded-full">
        <Image
          className="h-[100px] w-[100px] rounded-full object-cover"
          src={`/assets/avatar/avatar-circle/avatar${avatar}-circle.png`}
          alt="avatar"
          width={100}
          height={100}
        />
      </div>
      <div className="absolute top-[1px]">
        <button
          onClick={() => {
            updateGender(gender);
          }}
          className="flex items-center justify-center capitalize w-[32px] h-[32px] bg-white rounded-full ml-[80px]"
        >
          <Image
            src="/assets/figmaImg/Refresh.png"
            className="w-[20px] h-[20px]"
            width={100}
            height={100}
            alt="avatar_changer"
          />
        </button>
      </div>
    </div>
  );
}

export default InputAvatar;
