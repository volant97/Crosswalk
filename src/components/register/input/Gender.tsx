'use client';

import { registerState } from '@/recoil/register';
import React from 'react';
import { useRecoilState } from 'recoil';

function Gender() {
  const [register, setRegister] = useRecoilState(registerState);
  return <div>Gender</div>;
}

export default Gender;
