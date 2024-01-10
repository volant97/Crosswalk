import Interest from '@/components/register/interest/Interest';
import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Agreement from '@/components/register/input/Agreement';
import Gender from '@/components/register/input/Gender';
import Name from '@/components/register/input/Name';
import React from 'react';
import { Spacer } from '@nextui-org/react';

function Register() {
  return (
    <div>
      <Agreement />
      <Spacer y={10} />
      <Name />
      <Spacer y={10} />
      <Gender />
      <Spacer y={10} />
      <AgeAndHeight />
      <Spacer y={10} />
      <Interest />
    </div>
  );
}

export default Register;
