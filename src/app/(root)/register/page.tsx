'use client';

import Agreement from '@/components/register/input/Agreement';

import React, { useEffect, useState } from 'react';

function RegisterPage() {
  return (
    <>
      {/* 가입 절차별 컴포넌트 */}
      <Agreement />
      {/* <Name />
      <Mbti />
      <AgeAndHeight />
      <Interest />
      <UploadImg /> */}
    </>
  );
}

export default RegisterPage;
