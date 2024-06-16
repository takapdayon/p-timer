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

type NPFileFormProps = ComponentProps<'input'>;
export const NPFileForm = forwardRef<HTMLInputElement, NPFileFormProps>(({ className, ...props }, ref) => {
  const mergedClass = twMerge(
    'cursor-pointer file:cursor-pointer block w-full rounded-md shadow-np-shallow-flat text-sm text-slate-500 file:mr-2 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-sky-50 file:text-sky-600 hover:file:bg-sky-100',
    className,
  );
  return (
    <div className="relative">
      <input ref={ref} type="file" className={mergedClass} {...props} />
    </div>
  );
});
