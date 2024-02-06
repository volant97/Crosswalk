import React from 'react';
import { LuPencil } from 'react-icons/lu';

type Props = {
  mbti: string;
  openMbtiModal: () => void;
};

function InputMbti({ mbti, openMbtiModal }: Props) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <p className="font-semibold mb-[0.5rem]">MBTI</p>
      <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize bg-white border-1 border-solid border-black rounded-full">
        {mbti}
        <div
          onClick={() => {
            openMbtiModal();
          }}
          className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
        >
          <LuPencil size={16} />
        </div>
      </div>
    </div>
  );
}

export default InputMbti;
