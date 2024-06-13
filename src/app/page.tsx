'use client';

import { TimerForm } from '@/app/components/Form';
import { Timer } from '@/app/components/Timer';
import { FlatNPButton, PressedNPButton } from '@/app/components/buttons';
import { TimeFormSchema } from '@/app/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [countState, setCountState] = useState(1);

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

  const [onBreakTime, setOnBreakTime] = useState(false);

  const onExpire = useCallback(() => {
    if (onBreakTime) {
      setOnBreakTime(false);
      return getTime(getValues('time'));
    }

    setOnBreakTime(true);
    setCountState(prev => prev + 1);

    if (!getValues('needLongBreak')) {
      return getTime(getValues('breakTime'));
    }
    if (countState !== 0 && countState % getValues('setCount') === 0) {
      return getTime(getValues('longBreakTime'));
    }
    return getTime(getValues('breakTime'));
  const onClickRestart = useCallback(() => {
    setCountState(1);
    return getTime(getValues('time'));
  }, [getTime, getValues]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex min-h-[40rem] w-96 flex-col gap-8 rounded-[24px] bg-background px-6 py-12 shadow-np-flat">
        <div className="flex w-full justify-between">
          <h2 className="text-3xl font-bold">Timer</h2>
          {configOpen ? (
            <PressedNPButton className="size-8" onClick={() => setConfigOpen(false)}>
              <span className="i-material-symbols-settings-outline-rounded size-6"></span>
            </PressedNPButton>
          ) : (
            <FlatNPButton className="size-8" onClick={() => setConfigOpen(true)}>
              <span className="i-material-symbols-settings-outline-rounded size-6"></span>
            </FlatNPButton>
          )}
        </div>
        {configOpen ? (
          <TimerForm register={register} watch={watch} errors={errors} />
        ) : (
          <Timer
            expiryTimestamp={getTime(getValues('time'))}
            onExpire={onExpire}
            onClickRestart={onClickRestart}
            countState={countState}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
