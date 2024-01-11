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
      {/* test */}
      <button
        onClick={() => {
          setRegister({
            uid: 'test',
            name: '홍길동',
            gender: 'M',
            mbti: 'INTJ',
            age: 27,
            height: 180,
            interest: ['게임', '여행', '영화'],
            user_img: '이미지',
            avatar: 15,
            notice: '얍',
            information_use_period: '기간',
            information_agreement: true
          });
        }}
      >
        테스트 데이터 넣기
      </button>
      {/* 페이지 디자인 나온 후 체크박스로 변경 */}
      <Button className="w-full bg-customYellow rounded-3xl mb-10" onClick={handleNextBtn}>
        NEXT
      </Button>
    </>
  );
}

export default Agreement;
