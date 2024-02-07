import React, { Fragment } from 'react';

type Props = {
  age: number | null;
  name: string | null;
  interest: string[] | null;
};

function MyInfo({ age, name, interest }: Props) {
  return (
    <div className="absolute flex flex-col gap-[10px] bottom-[24px] left-[20px]">
      <div className="flex items-end w-full gap-[4px]">
        <h1 className="text-[24px] font-bold leading-[24px] text-white">{name}</h1>
        <h2 className="h-[16px] text-[16px]  leading-[16px] font-medium text-white">{age}</h2>
      </div>
      <div className="flex flex-warp w-full items-center gap-[4px] h-[24px] ">
        {interest?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                key={index}
                className="flex items-center justify-center py-[4px] px-[10px] text-center border-[1px] border-solid border-white text-white  rounded-[1rem] text-[13px] font-medium h-[24px] leading-[13px]  bg-gray-800 bg-opacity-10"
              >
                {item}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default MyInfo;
