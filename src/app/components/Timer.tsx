'use client';
import { FlatNPButton } from '@/app/components/buttons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimer } from 'react-timer-hook';

type TimerProps = {
  expiryTimestamp: Date;
  onExpire: () => Date;
  getRestartTime: () => Date;
  countState: number;
};

export const Timer = ({ expiryTimestamp, onExpire, getRestartTime, countState }: TimerProps) => {
  const [expired, setExpired] = useState(false);
  const [flipState, setFlipState] = useState<boolean>();

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    autoStart: false,
    expiryTimestamp,
    /*NOTE:
    onExpire: () => restart(onExpire(), true),
    上記のように指定できない。ので仕方なしuseEffect...使いたくねぇ
    ref: https://github.com/amrlabib/react-timer-hook/issues/70
    */
    onExpire: () => {
      setFlipState(prev => !prev);
      setExpired(true);
    },
  });

  const formattedTime = useMemo(
    () => `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    [minutes, seconds],
  );

  useEffect(() => {
    if (flipState === undefined) return;
    const time = onExpire();
    restart(time, true);
    setExpired(false);
  }, [flipState]); // ごめんよ...exhaustive-depsりんたー

  const onClickRestart = useCallback(() => restart(getRestartTime(), false), [getRestartTime, restart]);

  return (
    <div className="w-fill flex h-full grow flex-col gap-8">
      <div className="flex grow items-center justify-center">
        <div className="flex size-64 items-center justify-center rounded-full shadow-np-fly">
          <div className="mt-6 text-center text-4xl font-bold tracking-widest">
            <h3>{formattedTime}</h3>
            <span className="text-base">set: {countState}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {(expired ? !isRunning : isRunning) ? (
          <FlatNPButton className="w-32 px-6 py-2 font-bold text-red-600" onClick={pause}>
            <div className="flex items-center justify-center gap-1">
              <span className="i-material-symbols-pause-circle-outline-rounded size-5"></span>
              Stop
            </div>
          </FlatNPButton>
        ) : (
          <FlatNPButton className="w-32 px-6 py-2 font-bold text-green-600" onClick={resume}>
            <div className="flex items-center justify-center gap-1">
              <span className="i-material-symbols-play-circle-outline-rounded size-5"></span>
              Start
            </div>
          </FlatNPButton>
        )}
        <FlatNPButton className="w-32 px-6 py-2 font-bold text-sky-600" onClick={onClickRestart}>
          <div className="flex items-center justify-center gap-1">
            <span className="i-material-symbols-replay-circle-filled-outline-rounded size-5"></span>
            Restart
          </div>
        </FlatNPButton>
      </div>
    </div>
  );
};
