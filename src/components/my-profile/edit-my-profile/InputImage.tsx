import Image from 'next/image';
import React from 'react';
import { LuPencil } from 'react-icons/lu';
import { PiPlusThin } from 'react-icons/pi';

type Props = {
  previewImg: (event: React.ChangeEvent<HTMLInputElement>) => false | undefined;
  selectedImg: string;
};

function InputImage({ previewImg, selectedImg }: Props) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <label>사진</label>
      <label className="relative cursor-pointer" htmlFor="usersImg">
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/heic"
          id="usersImg"
          onChange={previewImg}
          className="hidden"
        />
        {selectedImg === '' ? (
          <div className="w-[7.5rem] h-[10.25rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[1rem]">
            <PiPlusThin size={50} className="fill-gray-E6" />
          </div>
        ) : (
          <div className="relative w-[120px] h-[164px] ">
            <Image className="rounded-[11.364px] object-cover" src={selectedImg} alt="user_img" fill />
          </div>
        )}
        <div className="absolute bottom-[-10px] left-[100px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110">
          <LuPencil size={16} />
        </div>
      </label>
    </div>
  );
}

export default InputImage;
