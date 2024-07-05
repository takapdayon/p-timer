'use client';

import { NPButton } from '@/app/components/Elements/Button';
import { HeaderButton } from '@/app/components/HeaderButton';
import { Policy } from '@/app/components/Policy';
import { SettingForm } from '@/app/components/SettingForm';
import { Timer } from '@/app/components/Timer';
import { TimeFormDefaultValues } from '@/app/type';
import { useNotification, useSoundEffects } from '@/app/useHook';
import { useCallback, useState } from 'react';

const TABS = {
  timer: 0,
  config: 1,
  policy: 2,
} as const;

const useTabs = () => {
  const [tabs, setTabs] = useState<0 | 1 | 2>(TABS.timer);

  const onClickConfig = useCallback(() => {
    setTabs(prev => (prev === TABS.config ? TABS.timer : TABS.config));
  }, []);

  const onClickPolicy = useCallback(() => {
    setTabs(prev => (prev === TABS.policy ? TABS.timer : TABS.policy));
  }, []);

  return {
    tabs,
    onClickConfig,
    onClickPolicy,
  };
};

const Home = () => {
  const { tabs, onClickConfig, onClickPolicy } = useTabs();
  const [onBreakTime, setOnBreakTime] = useState(false);
  const [countState, setCountState] = useState(1);
  const { playStartSE, playEndSE, setStartSE, setEndSE, volume, setVolume } = useSoundEffects();
  const [settingTime, setSettingTime] = useState(TimeFormDefaultValues);
  const { onWorkNotification, onBreakNotification, onLongBreakNotification } = useNotification();

  const getTime = useCallback((minutes: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + minutes * 60);
    return time;
  }, []);

  const onExpire = useCallback(() => {
    if (onBreakTime) {
      setOnBreakTime(false);
      playStartSE();
      onWorkNotification();
      return getTime(settingTime.time);
    }
    playEndSE();
    setOnBreakTime(true);
    setCountState(prev => prev + 1);

    if (settingTime.needLongBreak && countState !== 0 && countState % settingTime.setCount === 0) {
      onLongBreakNotification();
      return getTime(settingTime.longBreakTime);
    }
    onBreakNotification();
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
    onWorkNotification,
    onBreakNotification,
    onLongBreakNotification,
  ]);

  const onClickRestart = useCallback(() => {
    setCountState(1);
    setOnBreakTime(false);
    return getTime(settingTime.time);
  }, [getTime, settingTime.time]);

  return (
    <main className="flex h-full flex-col items-center justify-between">
      <div className="flex size-full flex-col bg-background shadow-np-flat xs:my-auto xs:h-[41rem] xs:w-96 xs:rounded-[24px]">
        <div className="flex h-full flex-col gap-8 p-6 xs:py-8">
          <div className="flex w-full items-center justify-between">
            <h2
              className={`i-material-symbols-timer size-10 text-3xl font-bold ${
                onBreakTime
                  ? settingTime.needLongBreak && countState !== 0 && (countState - 1) % settingTime.setCount === 0
                    ? 'text-blue-500'
                    : 'text-green-500'
                  : 'text-red-500'
              }`}
            />
            <HeaderButton openConfig={tabs === TABS.config} setOpenConfig={onClickConfig} />
          </div>
          <SettingForm
            openConfig={tabs === TABS.config}
            setStartSE={setStartSE}
            setEndSE={setEndSE}
            settingTime={settingTime}
            setSettingTime={setSettingTime}
            volume={volume}
            setVolume={setVolume}
          />
          <Timer
            openTimer={tabs === TABS.timer}
            expiryTimestamp={getTime(settingTime.time)}
            onExpire={onExpire}
            onClickRestart={onClickRestart}
            countState={countState}
          />
          <Policy openPolicy={tabs === TABS.policy} />
        </div>
        <footer className="mb-4 flex w-full items-center justify-center text-xs text-subtext">
          <span>© 2024 taka p*2. All rights reserved.</span>
          <NPButton
            npType={tabs === TABS.policy ? 'press' : 'flat'}
            npColor={tabs === TABS.policy ? 'blue' : undefined}
            className="ml-4 size-4 rounded-sm"
            onClick={onClickPolicy}
          >
            <span className="i-material-symbols-question-mark-rounded size-3"></span>
          </NPButton>
        </footer>
      </div>
    </main>
  );
};

export default Home;
