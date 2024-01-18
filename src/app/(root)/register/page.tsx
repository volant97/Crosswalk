'use client';

import Mbti from '@/components/register/mbti/Mbti';
import Interest from '@/components/register/interest/Interest';
import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Agreement from '@/components/register/input/Agreement';
import Name from '@/components/register/input/Name';
import React, { useState } from 'react';
import UploadImg from '@/components/register/upload_image/UploadImg';
import Page from '@/components/layout/Page';

function RegisterPage() {
  return (
    <Page noBack noNavBar noNotiBell>
      {/* 헤더 */}
      <Agreement />
      <Name />
      <Mbti />
      <AgeAndHeight />
      <Interest />
      <UploadImg />
      {/* 버튼 */}
    </Page>
  );
}

export default RegisterPage;
