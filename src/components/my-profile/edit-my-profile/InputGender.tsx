import React from 'react';

type Props = {
  gender: string;
};

function InputGender({ gender }: Props) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <label>성별</label>
      <div className="flex justify-start gap-[8px] w-full">
        <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize text-gray-500 bg-gray-200 border-1 border-solid border-gray-300 rounded-full">
          {gender === 'M' ? '남자' : '여자'}
        </div>
      </div>
    </div>
  );
}

export default InputGender;
