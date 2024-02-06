import React from 'react';
import { LuPencil } from 'react-icons/lu';

type Props = {
  interest: string | undefined;
  interest1: string | undefined;
  interest2: string | undefined;
  openInterestModal: () => void;
};

function InputInterest({ interest, interest1, interest2, openInterestModal }: Props) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <label>관심사</label>
      <div className="flex justify-start items-start gap-[6px] flex-wrap self-stretch">
        <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
          {interest}
        </div>
        <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
          {interest1}
        </div>
        <div className="relative flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
          {interest2}
          <div
            onClick={() => {
              openInterestModal();
            }}
            className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
          >
            <LuPencil size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputInterest;
