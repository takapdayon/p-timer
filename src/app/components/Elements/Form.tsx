import { forwardRef, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type NPNumberInputFormProps = ComponentProps<'input'>;

export const NPNumberInputForm = forwardRef<HTMLInputElement, NPNumberInputFormProps>(
  ({ className, ...props }, ref) => {
    const mergedClass = twMerge(
      'h-10 w-full rounded-lg bg-background p-2 shadow-np-shallow-pressed outline-none',
      className,
    );
    return <input ref={ref} className={mergedClass} type="number" {...props} />;
  },
);

type NPCheckboxFormProps = ComponentProps<'input'>;
export const NPCheckboxForm = forwardRef<HTMLInputElement, NPCheckboxFormProps>(
  ({ checked, className, ...props }, ref) => {
    const mergedClass = twMerge(
      'block size-4 appearance-none rounded-sm bg-background shadow-np-shallow-flat outline-none checked:shadow-np-shallow-pressed',
      className,
    );
    return (
      <div className="relative">
        <input ref={ref} type="checkbox" className={mergedClass} checked={checked} {...props} />
        <span
          className={`i-material-symbols-fitbit-check-small-rounded pointer-events-none absolute left-[-4px] top-[-4px] size-6 ${checked ? 'text-sky-500' : 'text-neutral-500'} `}
        />
      </div>
    );
  },
);

type NPFileFormProps = {
  fileName: string;
  showClose?: boolean;
  onClickClose?: ComponentProps<'span'>['onClick'];
} & ComponentProps<'input'>;

export const NPFileForm = forwardRef<HTMLInputElement, NPFileFormProps>(
  ({ fileName, className, showClose = false, onClickClose, ...props }, ref) => {
    const mergedClass = twMerge(
      'w-24 text-center cursor-pointer rounded-l-md text-sm py-2 px-4 font-semibold bg-sky-50 text-sky-600 hover:bg-sky-100',
      className,
    );

    return (
      <div className="flex">
        <input
          ref={ref}
          type="file"
          id="file"
          className="hidden"
          onClick={e => {
            (e.target as HTMLInputElement).value = '';
          }}
          {...props}
        />
        <label htmlFor="file" className={mergedClass}>
          選択
        </label>
        <div className="flex w-full items-center justify-between rounded-r-md text-sm text-slate-500 shadow-np-shallow-pressed">
          <span className="ml-2 max-w-56 truncate">{fileName}</span>
          {showClose && (
            <span
              onClick={onClickClose}
              className="i-material-symbols-close-rounded mr-2 cursor-pointer text-red-500"
            ></span>
          )}
        </div>
      </div>
    );
  },
);

type NPRangeSliderFormProps = ComponentProps<'input'>;

export const NPRangeSliderForm = forwardRef<HTMLInputElement, NPRangeSliderFormProps>(
  ({ className, ...props }, ref) => {
    const mergedClass = twMerge(
      `
        h-2 w-full appearance-none rounded-full cursor-pointer shadow-np-shallow-pressed
        [&::-webkit-slider-thumb]:size-4
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:border-none
        [&::-webkit-slider-thumb]:bg-background
        [&::-webkit-slider-thumb]:shadow-np-shallow-flat
        active:[&::-webkit-slider-thumb]:scale-110
      `,
      className,
    );

    return (
      <div className="mt-1 flex w-full items-center gap-2">
        <span className="i-material-symbols-volume-off-rounded size-7 text-gray-500" />
        <input ref={ref} type="range" className={mergedClass} {...props} />
        <span className="i-material-symbols-volume-up-rounded size-7 text-gray-500" />
      </div>
    );
  },
);
