'use client';

import { NPButton } from '@/app/components/Elements/Button';
import { SettingForm } from '@/app/components/SettingForm';
import { Timer } from '@/app/components/Timer';
import { TimeFormDefaultValues } from '@/app/type';
import { useSoundEffects } from '@/app/useHook';
import { useCallback, useState } from 'react';

const Home = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const [onBreakTime, setOnBreakTime] = useState(false);
  const [countState, setCountState] = useState(1);
  const { playStartSE, playEndSE, setStartSE, setEndSE, volume, setVolume } = useSoundEffects();
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
    <main className="flex h-full flex-col items-center justify-between">
      <div className="xs:my-auto xs:w-96 xs:rounded-[24px] xs:h-[41rem] flex size-full flex-col bg-background shadow-np-flat">
        <div className="xs:py-8 flex h-full flex-col gap-8 p-6">
          <div className="flex w-full items-center justify-between">
            <h2
              className={`i-material-symbols-timer size-10 text-3xl font-bold ${
                onBreakTime
                  ? countState !== 0 && (countState - 1) % settingTime.setCount === 0
                    ? 'text-blue-500'
                    : 'text-green-500'
                  : 'text-red-500'
              }`}
            />
            <NPButton
              npType={openConfig ? 'press' : 'flat'}
              npColor={openConfig ? 'blue' : undefined}
              className="size-8"
              onClick={() => setOpenConfig(prev => !prev)}
            >
              <span className="i-material-symbols-settings-outline-rounded size-6"></span>
            </NPButton>
          </div>
          <SettingForm
            openConfig={openConfig}
            setStartSE={setStartSE}
            setEndSE={setEndSE}
            settingTime={settingTime}
            setSettingTime={setSettingTime}
            volume={volume}
            setVolume={setVolume}
          />
          <Timer
            openConfig={openConfig}
            expiryTimestamp={getTime(settingTime.time)}
            onExpire={onExpire}
            onClickRestart={onClickRestart}
            countState={countState}
          />
        </div>
        <footer className="mb-4 w-full text-center text-xs text-gray-400">
          © 2024 taka p*2. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Home;
