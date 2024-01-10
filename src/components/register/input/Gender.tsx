'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Gender() {
  const [register, setRegister] = useRecoilState(registerState);
  const [gender, setGender] = useState<string>('');
  const router = useRouter();

  const handleMBtn = () => {
    setGender('M');
  };

  const handleFBtn = () => {
    setGender('F');
  };

  const handleNextBtn = () => {
    setRegister({
      ...register,
      gender
    });
    router.push('#mbti');
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <button onClick={handleMBtn}>남자</button>
        <button onClick={handleFBtn}>여자</button>
        {/* test */}
        <div>성별 : {gender}</div>
      </div>
      {/* <Button className="w-full bg-customYellow rounded-3xl cursor-pointer mb-10" onClick={handleNextBtn}>
        NEXT
      </Button> */}
    </>
  );
}

export default Gender;
