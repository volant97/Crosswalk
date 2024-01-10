'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Agreement() {
  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const [agreement, setAgreement] = useState<boolean>(false);
  const period = '기간설정중';

  const handleAgreementBtn = () => {
    setAgreement(true);
  };

  const handleNextBtn = () => {
    setRegister({
      ...register,
      information_use_period: period,
      information_agreement: agreement
    });

    router.push('#name');
  };

  return (
    <>
      <div className="min-h-[calc(100dvh-12rem)]">
        <button onClick={handleAgreementBtn}>동의</button>
        <button onClick={handleNextBtn}>NEXT</button>
        {/* test */}
        <div>동의 : {agreement.toString()}</div>
      </div>
      {/* 페이지 디자인 나온 후 체크박스로 변경 */}
      <Button className="w-full bg-customYellow rounded-3xl mb-10" onClick={handleNextBtn}>
        NEXT
      </Button>
    </>
  );
}

export default Agreement;
