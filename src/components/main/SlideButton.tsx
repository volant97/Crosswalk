import React, { PropsWithChildren } from 'react';
import { Button as NextButton } from '@nextui-org/button';

interface ButtonProps {
  color: 'default' | 'green';
  size: 'sm' | 'md' | 'lg';
  nextCard: () => void;
  disabled: boolean;
}

function SlideButon({ color, children, size, nextCard, disabled }: PropsWithChildren<ButtonProps>) {
  return (
    <NextButton
      disabled={disabled}
      onClick={nextCard}
      className={`w-full h-[50px] px-[20px] flex gap-x-[10px] rounded-[30px] text-[18px] bg-[#F6F6F6] font-semibold text-[#AAAAAA] ${
        color === 'green' ? '!bg-customGreen3 !text-white' : ''
      } ${size === 'md' && 'mt-[1.25rem]'}`}
    >
      {children}
    </NextButton>
  );
}

export default SlideButon;
