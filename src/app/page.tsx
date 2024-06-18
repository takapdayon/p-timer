'use client';

import { NPButton } from '@/app/components/Elements/Button';
import { SettingForm } from '@/app/components/SettingForm';
import { Timer } from '@/app/components/Timer';
import { TimeFormDefaultValues } from '@/app/type';
import { useSoundEffects } from '@/app/useHook';
import { useCallback, useState } from 'react';

const Home = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [onBreakTime, setOnBreakTime] = useState(false);
  const [countState, setCountState] = useState(1);
  const { playStartSE, playEndSE, setStartSE, setEndSE } = useSoundEffects();
  const [settingTime, setSettingTime] = useState(TimeFormDefaultValues);

  const getTime = useCallback((minutes: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  }, []);

  const onExpire = useCallback(() => {
    if (onBreakTime) {
      setOnBreakTime(false);
      playStartSE();
      return getTime(settingTime.time);
    }

    playEndSE();
    setOnBreakTime(true);
    setCountState(prev => prev + 1);

    if (!settingTime.needLongBreak) {
      return getTime(settingTime.breakTime);
    }
    if (countState !== 0 && countState % settingTime.setCount === 0) {
      return getTime(settingTime.longBreakTime);
    }
    return getTime(settingTime.breakTime);
  }, [
    countState,
    getTime,
    onBreakTime,
    playEndSE,
    playStartSE,
    settingTime.breakTime,
    settingTime.longBreakTime,
    settingTime.needLongBreak,
    settingTime.setCount,
    settingTime.time,
  ]);

  const onClickRestart = useCallback(() => {
    setCountState(1);
    setOnBreakTime(false);
    return getTime(settingTime.time);
  }, [getTime, settingTime.time]);

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
            <SettingForm
              setStartSE={setStartSE}
              setEndSE={setEndSE}
              settingTime={settingTime}
              setSettingTime={setSettingTime}
            />
          ) : (
            <Timer
              expiryTimestamp={getTime(settingTime.time)}
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
