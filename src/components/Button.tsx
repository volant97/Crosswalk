import React, { PropsWithChildren } from 'react';
import { Button as NextButton } from '@nextui-org/button';

interface ButtonProps {
  color: 'default' | 'green';
  size: 'sm' | 'md' | 'lg';
}

function Button({ color, children }: PropsWithChildren<ButtonProps>) {
  return (
    <NextButton
      className={`w-full h-[50px] px-[20px] flex gap-x-[10px] rounded-[30px] text-[18px] bg-[#F6F6F6] font-semibold text-[#AAAAAA] ${
        color === 'green' ? '!bg-customGreen !text-white' : ''
      }`}
    >
      {children}
    </NextButton>
  );
}

export default Button;
