'use client';

import { registerState } from '@/recoil/register';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

function Agreement() {
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
  };

  return (
    <div className="w-[300px] border-2 border-indigo-600">
      {/* 페이지 디자인 나온 후 체크박스로 변경 */}
      <button onClick={handleAgreementBtn}>동의</button>
      <button onClick={handleNextBtn}>NEXT</button>
      {/* test */}
      <div>동의 : {agreement.toString()}</div>
    </div>
  );
}

export default Agreement;
