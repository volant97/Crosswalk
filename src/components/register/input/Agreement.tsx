'use client';

import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { addMonths, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Agreement() {
  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const [agreement, setAgreement] = useState<boolean>(false);
  const currentDate = new Date();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';

  const handleAgreementBtn = () => {
    setAgreement(true);
  };

  const handleNextBtn = () => {
    if (!agreement) {
      return alert('동의하지 않으면 추가 진행이 불가합니다.');
    }

    setRegister((prevValue) => ({
      ...prevValue,
      information_use_period: format(period, dateFormat),
      information_agreement: true
    }));

    router.push('#name');
  };

  return (
    <>
      <div className="min-h-[calc(100dvh-12rem)]">
        <button onClick={handleAgreementBtn}>동의</button>
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
