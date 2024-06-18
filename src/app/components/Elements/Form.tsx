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
} & ComponentProps<'input'>;

export const NPFileForm = forwardRef<HTMLInputElement, NPFileFormProps>(({ fileName, className, ...props }, ref) => {
  const mergedClass = twMerge(
    'w-24 text-center cursor-pointer rounded-l-md text-sm py-2 px-4 font-semibold bg-sky-50 text-sky-600 hover:bg-sky-100',
    className,
  );
  return (
    <div className="flex">
      <input ref={ref} type="file" id="file" className="hidden" {...props} />
      <label htmlFor="file" className={mergedClass}>
        選択
      </label>
      <div className="flex w-full items-center rounded-r-md text-sm text-slate-500 shadow-np-shallow-pressed">
        <span className="ml-2">{fileName}</span>
      </div>
    </div>
  );
});
