import React from 'react';

type Props = {
  height: number | null;
  gender: string | null;
  mbti: string | null;
};

function MyAdditionalInfo({ height, gender, mbti }: Props) {
  const border =
    'border-2 border-solid border-black px-[0.63rem] py-[0.25rem] rounded-[1rem] text-[0.8125rem] h-[26px]';

  return (
    <div className="flex flex-col gap-[24px] w-full bg-customGreen2  px-[20px] py-[24px]">
      <div className="flex flex-col gap-[8px]  h-[52px]">
        <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">기본정보</h1>
        <div className="flex flex-row gap-[0.25rem]">
          <div
            className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
          >
            {height}cm
          </div>
          <div
            className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
          >
            {gender === 'M' ? '남자' : '여자'}
          </div>
        </div>
      </div>
      <div className="flex flex-col h-[52px] ">
        <h1 className="text-[18px] leading-[18px] font-[400] text-gray-999">MBTI</h1>
        <div className="flex flex-row gap-[0.25rem] mt-[0.5rem] ">
          <div
            className={`${border} flex justify-center items-center px-[10px] py-[4px] text-[13px] font-medium leading-[13px] rounded-full border-[1px] bg-customGreen2`}
          >
            {mbti}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAdditionalInfo;
