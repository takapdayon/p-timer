'use client';

import { useState, type ComponentProps, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BaseNPButtonProps = { children: ReactNode } & ComponentProps<'button'>;

const BaseNPButton = ({ children, className, ...props }: BaseNPButtonProps) => {
  const mergedClass = twMerge('flex items-center justify-center rounded-lg bg-background', className);
  return (
    <button type="button" className={mergedClass} {...props}>
      {children}
    </button>
  );
};

type FlatNPButtonProps = BaseNPButtonProps;
export const FlatNPButton = ({ children, className, ...props }: FlatNPButtonProps) => {
  const mergedClass = twMerge('shadow-np-shallow-flat active:shadow-np-shallow-pressed', className);
  return (
    <BaseNPButton className={mergedClass} {...props}>
      {children}
    </BaseNPButton>
  );
};

type PressedNPButtonProps = BaseNPButtonProps;
export const PressedNPButton = ({ children, className, ...props }: PressedNPButtonProps) => {
  const mergedClass = twMerge('text-sky-500 shadow-np-shallow-pressed', className);
  return (
    <BaseNPButton className={mergedClass} {...props}>
      {children}
    </BaseNPButton>
  );
};

export const NPButton = ({ initial, children }: { initial: boolean; children: ReactNode }) => {
  const [state, setState] = useState(initial);
  return (
    <>
      {state ? (
        <FlatNPButton onClick={() => setState(false)}>{children}</FlatNPButton>
      ) : (
        <PressedNPButton onClick={() => setState(true)}>{children}</PressedNPButton>
      )}
    </>
  );
};
