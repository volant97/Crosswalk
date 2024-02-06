import React from 'react';

type Props = {
  name: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputName({ name, onChangeHandler }: Props) {
  return (
    <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
      <label>이름</label>
      <input
        className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize placeholder:text-[#888] focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        value={name}
        onChange={onChangeHandler}
        type="text"
        name="name"
        id="id"
        autoComplete="off"
        placeholder={'홍길동'}
      />
    </div>
  );
}

export default InputName;
