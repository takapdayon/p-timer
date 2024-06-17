'use client';

import { NPButton } from '@/app/components/Elements/Button';
import { TimerForm } from '@/app/components/SettingForm';
import { Timer } from '@/app/components/Timer';
import { TimeFormSchema } from '@/app/type';
import { useSoundEffects } from '@/app/useHook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [onBreakTime, setOnBreakTime] = useState(false);
  const [countState, setCountState] = useState(1);
  const { playStartSE, playEndSE, setStartSE, setEndSE } = useSoundEffects();

  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TimeFormSchema>({
    resolver: zodResolver(TimeFormSchema),
    defaultValues: {
      time: 25,
      breakTime: 5,
      longBreakTime: 30,
      needLongBreak: true,
      setCount: 4,
    },
    mode: 'onBlur',
  });

  const getTime = useCallback((minutes: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  }, []);

  const onExpire = useCallback(() => {
    if (onBreakTime) {
      setOnBreakTime(false);
      playStartSE();
      return getTime(getValues('time'));
    }

    playEndSE();
    setOnBreakTime(true);
    setCountState(prev => prev + 1);

    if (!getValues('needLongBreak')) {
      return getTime(getValues('breakTime'));
    }
    if (countState !== 0 && countState % getValues('setCount') === 0) {
      return getTime(getValues('longBreakTime'));
    }
    return getTime(getValues('breakTime'));
  }, [countState, onBreakTime, getTime, getValues, playStartSE, playEndSE]);

  const onClickRestart = useCallback(() => {
    setCountState(1);
    setOnBreakTime(false);
    return getTime(getValues('time'));
  }, [getTime, getValues]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex w-96 flex-col rounded-[24px] bg-background shadow-np-flat">
        <div className="flex min-h-[41rem] flex-col gap-8 px-6 py-12">
          <div className="flex w-full justify-between">
            <h2 className="text-3xl font-bold">Timer</h2>
            <NPButton
              npType={configOpen ? 'press' : 'flat'}
              npColor={configOpen ? 'blue' : undefined}
              className="size-8"
              onClick={() => setConfigOpen(prev => !prev)}
            >
              <span className="i-material-symbols-settings-outline-rounded size-6"></span>
            </NPButton>
          </div>
          {configOpen ? (
            <TimerForm register={register} watch={watch} errors={errors} setStartSE={setStartSE} setEndSE={setEndSE} />
          ) : (
            <Timer
              expiryTimestamp={getTime(getValues('time'))}
              onExpire={onExpire}
              onClickRestart={onClickRestart}
              countState={countState}
            />
          )}
        </div>
        <footer className="mb-4 w-full text-center text-xs text-gray-400">
          © 2024 taka p*2. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Home;
