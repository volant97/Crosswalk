import React, { PropsWithChildren } from 'react';
import { Button as NextButton } from '@nextui-org/button';

interface ButtonProps {
  color: 'default' | 'green';
  size: 'sm' | 'md' | 'lg';
  openFlirtingModal: () => void;
  disabled: boolean;
}

function Button({ color, children, size, openFlirtingModal, disabled }: PropsWithChildren<ButtonProps>) {
  return (
    <NextButton
      disabled={disabled}
      onClick={openFlirtingModal}
      className={`w-full h-[50px] px-[20px] flex gap-x-[10px] rounded-[30px] text-[18px] bg-[#F6F6F6] font-semibold text-[#AAAAAA] ${
        color === 'green' ? '!bg-customGreen3 !text-white' : ''
      } ${size === 'md' && 'mt-[1.25rem]'} ${disabled ? '!bg-[#F6F6F6]' : ''}`}
    >
      {children}
    </NextButton>
  );
}

export default Button;
