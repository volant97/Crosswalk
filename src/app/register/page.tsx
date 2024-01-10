import Mbti from '@/components/register/mbti/Mbti';
import Interest from '@/components/register/interest/Interest';
import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Gender from '@/components/register/input/Gender';
import Name from '@/components/register/input/Name';
import React from 'react';

function Register() {
  return (
    <div>
      {/* 헤더 */}
      <Mbti />
      <Name />
      <Gender />
      <AgeAndHeight />
      <Interest />
      {/* 버튼 */}
    </div>
  );
}

export default Register;
