'use client';

import { registerState } from '@/recoil/register';
import React from 'react';
import { useRecoilState } from 'recoil';

function Name() {
  const [register, setRegister] = useRecoilState(registerState);
  return <div>Name</div>;
}

export default Name;
