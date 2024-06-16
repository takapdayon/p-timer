'use client';

import { type ComponentProps, type ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const npButton = tv({
  base: 'flex items-center justify-center rounded-lg bg-background',
  variants: {
    npType: {
      press: 'shadow-np-shallow-pressed',
      normal: 'active:shadow-np-deep-pressed',
      flat: 'shadow-np-shallow-flat active:shadow-np-shallow-pressed',
      fly: 'bg-red-500',
    },
    npColor: {
      green: 'text-green-600',
      red: 'text-red-600',
      blue: 'text-sky-600',
    },
  },
});

type NPButtonProps = {
  children: ReactNode;
  npType?: 'press' | 'flat' | 'fly' | 'normal';
  npColor?: 'green' | 'red' | 'blue';
} & ComponentProps<'button'>;

export const NPButton = ({ children, className, type = 'button', npType, npColor, ...props }: NPButtonProps) => {
  return (
    <button type={type} className={npButton({ npType, npColor, className })} {...props}>
      {children}
    </button>
  );
};
