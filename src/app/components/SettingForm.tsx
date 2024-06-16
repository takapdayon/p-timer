import { NPButton } from '@/app/components/Elements/Button';
import { NPCheckboxForm, NPFileForm, NPNumberInputForm } from '@/app/components/Elements/Form';
import type { TimeFormSchema } from '@/app/type';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

export const TimerForm = ({
  register,
  watch,
  errors,
}: {
  register: UseFormRegister<TimeFormSchema>;
  watch: UseFormWatch<TimeFormSchema>;
  errors: FieldErrors<TimeFormSchema>;
}) => {
  const [configTab, setConfigTab] = useState(1);
  const checked = watch('needLongBreak');
  return (
    <div>
      <div className="flex">
        <NPButton
          npType={configTab === 1 ? 'press' : undefined}
          npColor={configTab === 1 ? 'blue' : undefined}
          className="w-28 px-6 py-2 font-bold"
          onClick={() => setConfigTab(1)}
        >
          <div className="flex items-center justify-center gap-1">time</div>
        </NPButton>
        <NPButton
          npType={configTab === 2 ? 'press' : undefined}
          npColor={configTab === 2 ? 'blue' : undefined}
          className="w-28 px-6 py-2 font-bold"
          onClick={() => setConfigTab(2)}
        >
          <div className="flex items-center justify-center gap-1">sound</div>
        </NPButton>
      </div>
      {configTab === 1 && (
        <>
          <div className="my-6">
            <label className="text-sm text-gray-500">作業時間(分)</label>
            <NPNumberInputForm {...register('time', { valueAsNumber: true })} min={1} max={59} />
            <span className="text-sm text-red-500">{errors.time && errors.time.message}</span>
            <></>
          </div>
          <div className="my-6">
            <label className="text-sm text-gray-500">休憩時間(分)</label>
            <NPNumberInputForm {...register('breakTime', { valueAsNumber: true })} min={1} max={59} />
            <span className="text-sm text-red-500">{errors.breakTime && errors.breakTime.message}</span>
          </div>
          <div className="my-6">
            <label className="text-sm text-gray-500">ロング休憩時間(分)</label>
            <NPNumberInputForm {...register('longBreakTime', { valueAsNumber: true })} min={1} max={59} />
            <span className="text-sm text-red-500">{errors.longBreakTime && errors.longBreakTime.message}</span>
          </div>
          <div className="my-6">
            <label className="text-sm text-gray-500 ">ロング休憩の有無</label>
            <NPCheckboxForm {...register('needLongBreak')} checked={checked} />
            <span className="text-sm text-red-500">{errors.needLongBreak && errors.needLongBreak.message}</span>
          </div>
          <div className="my-6">
            <label className="text-sm text-gray-500">セット数</label>
            <NPNumberInputForm {...register('setCount', { valueAsNumber: true })} min={1} max={59} />
            <span className="text-sm text-red-500">{errors.setCount && errors.setCount.message}</span>
          </div>
        </>
      )}
      {configTab === 2 && (
        <>
          <div className="my-6">
            <label className="text-sm text-gray-500">開始SE</label>
            <NPFileForm {...register('time')} />
            <span className="text-sm text-red-500">{errors.time && errors.time.message}</span>
            <></>
          </div>
          <div className="my-6">
            <label className="text-sm text-gray-500">終了SE</label>
            <NPFileForm {...register('time')} />
            <span className="text-sm text-red-500">{errors.time && errors.time.message}</span>
            <></>
          </div>
        </>
      )}
    </div>
  );
};
