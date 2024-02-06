import React from 'react';

type Props = {
  height: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputHeight({ height, onChangeHandler }: Props) {
  return (
    <div className="relative flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <label>키</label>
      <input
        className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize appearance-none placeholder:text-[#888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        value={height?.toString()}
        onChange={onChangeHandler}
        type="number"
        name="height"
        id="height"
        autoComplete="off"
        placeholder={'180cm'}
      ></input>
      <p className="absolute right-[20px] bottom-[8px] text-[16px] font-[200] text-gray-999">cm</p>
    </div>
  );
}

export default InputHeight;
