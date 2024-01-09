import AgeAndHeight from '@/components/register/input/AgeAndHeight';
import Gender from '@/components/register/input/Gender';
import Name from '@/components/register/input/Name';
import React from 'react';

function Register() {
  return (
    <div>
      <Name />
      <Gender />
      <AgeAndHeight />
    </div>
  );
}

export default Register;
