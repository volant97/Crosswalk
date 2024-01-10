import Interest from '@/components/register/interest/Interest';
import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Agreement from '@/components/register/input/Agreement';
import Gender from '@/components/register/input/Gender';
import Name from '@/components/register/input/Name';
import React from 'react';

function Register() {
  return (
    <div>
      <Agreement />
      <Name />
      <Gender />
      <AgeAndHeight />
      <Interest />
    </div>
  );
}

export default Register;
