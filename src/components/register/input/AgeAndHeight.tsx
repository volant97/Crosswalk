'use client';

import { registerState } from '@/recoil/register';
import React from 'react';
import { useRecoilState } from 'recoil';

function AgeAndHeight() {
  const [register, setRegister] = useRecoilState(registerState);
  return <div>AgeAndHeight</div>;
}

export default AgeAndHeight;
