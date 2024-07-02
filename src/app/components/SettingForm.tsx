import { NPButton } from '@/app/components/Elements/Button';
import { NPCheckboxForm, NPFileForm, NPNumberInputForm, NPRangeSliderForm } from '@/app/components/Elements/Form';
import { TimeFormSchema } from '@/app/type';
import { useSoundEffects } from '@/app/useHook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type SettingFormProps = {
  openConfig: boolean;
  setStartSE: (file: string | File) => void;
  setEndSE: (file: string | File) => void;
  settingTime: TimeFormSchema;
  setSettingTime: Dispatch<SetStateAction<TimeFormSchema>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
};

export const SettingForm = ({
  openConfig,
  setStartSE,
  setEndSE,
  settingTime,
  setSettingTime,
  volume,
  setVolume,
}: SettingFormProps) => {
  const [configTab, setConfigTab] = useState(1);

  if (!openConfig) return null;

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
      {configTab === 1 && <TimeForm settingTime={settingTime} setSettingTime={setSettingTime} />}
      {configTab === 2 && (
        <SoundEffectForm setStartSE={setStartSE} setEndSE={setEndSE} volume={volume} setVolume={setVolume} />
      )}
    </div>
  );
};

const TimeForm = ({ settingTime, setSettingTime }: Pick<SettingFormProps, 'settingTime' | 'setSettingTime'>) => {
  const {
    trigger,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TimeFormSchema>({
    resolver: zodResolver(TimeFormSchema),
    values: settingTime,
    mode: 'onBlur',
  });

  const checked = watch('needLongBreak');

  const onSubmit = useCallback((values: TimeFormSchema) => setSettingTime(values), [setSettingTime]);

  const onHandleBlur = useCallback(async () => {
    if (await trigger()) {
      handleSubmit(onSubmit)();
    }
  }, [handleSubmit, onSubmit, trigger]);

  return (
    <>
      <div className="my-6">
        <label className="text-sm text-subtext">作業時間(分)</label>
        <NPNumberInputForm {...register('time', { valueAsNumber: true, onBlur: onHandleBlur })} min={1} max={59} />
        <span className="text-sm text-red-500">{errors.time && errors.time.message}</span>
        <></>
      </div>
      <div className="my-6">
        <label className="text-sm text-subtext">休憩時間(分)</label>
        <NPNumberInputForm {...register('breakTime', { valueAsNumber: true, onBlur: onHandleBlur })} min={1} max={59} />
        <span className="text-sm text-red-500">{errors.breakTime && errors.breakTime.message}</span>
      </div>
      <div className="my-6">
        <label className="text-sm text-subtext">ロング休憩時間(分)</label>
        <NPNumberInputForm
          {...register('longBreakTime', { valueAsNumber: true, onBlur: onHandleBlur })}
          min={1}
          max={59}
        />
        <span className="text-sm text-red-500">{errors.longBreakTime && errors.longBreakTime.message}</span>
      </div>
      <div className="my-6">
        <label className="text-sm text-subtext ">ロング休憩の有無</label>
        <NPCheckboxForm {...register('needLongBreak', { onBlur: onHandleBlur })} checked={checked} />
        <span className="text-sm text-red-500">{errors.needLongBreak && errors.needLongBreak.message}</span>
      </div>
      <div className="my-6">
        <label className="text-sm text-subtext">セット数</label>
        <NPNumberInputForm {...register('setCount', { valueAsNumber: true, onBlur: onHandleBlur })} min={1} max={59} />
        <span className="text-sm text-red-500">{errors.setCount && errors.setCount.message}</span>
      </div>
    </>
  );
};

const SoundEffectForm = ({
  setStartSE,
  setEndSE,
  volume,
  setVolume,
}: Pick<SettingFormProps, 'setStartSE' | 'setEndSE' | 'volume' | 'setVolume'>) => {
  const { startSE, endSE } = useSoundEffects();

  const onChangeStartSE = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length === 0 || files === null) return;
    setStartSE(files[0]);
  };

  const onChangeEndSE = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length === 0 || files === null) return;
    setEndSE(files[0]);
  };

  return (
    <>
      <div className="my-6">
        <div className="mb-1 text-sm text-subtext">開始SE</div>
        <NPFileForm
          id="start-file"
          accept="audio/*"
          onChange={onChangeStartSE}
          fileName={startSE?.file instanceof File ? startSE.file.name : startSE?.file ?? ''}
          showClose={typeof startSE?.file !== 'string'}
          onClickClose={() => setStartSE('default.mp3')}
        />
      </div>
      <div className="my-6">
        <div className="mb-1 text-sm text-subtext">終了SE</div>
        <NPFileForm
          id="end-file"
          accept="audio/*"
          onChange={onChangeEndSE}
          fileName={endSE?.file instanceof File ? endSE.file.name : endSE?.file ?? ''}
          showClose={typeof endSE?.file !== 'string'}
          onClickClose={() => setEndSE('default.mp3')}
        />
      </div>
      <div className="my-6">
        <div className="text-sm text-subtext">ボリューム</div>
        <NPRangeSliderForm max={1} step={0.01} value={volume} onChange={e => setVolume(parseFloat(e.target.value))} />
      </div>
    </>
  );
};
