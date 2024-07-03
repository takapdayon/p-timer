import { db } from '@/app/db.';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useAudio = (object: string | File | undefined, volume: number) => {
  const audio = useRef<HTMLAudioElement>();

  const playAudio = useCallback(() => {
    audio.current?.play();
  }, [audio]);

  const onChangeAudio = useCallback((object: string | File) => {
    const url = object instanceof File ? URL.createObjectURL(object) : object;
    audio.current = new Audio(url);
  }, []);

  useEffect(() => {
    if (object) {
      const url = object instanceof File ? URL.createObjectURL(object) : object;
      audio.current = new Audio(url);
      audio.current.volume = volume;
    }
  }, [object, volume]);

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  return {
    playAudio,
    onChangeAudio,
  };
};

export const useSoundEffects = () => {
  const startSE = useLiveQuery(() => db.soundEffects.where('startOrEnd').equals('start').first(), []);
  const endSE = useLiveQuery(() => db.soundEffects.where('startOrEnd').equals('end').first(), []);
  const [volume, setVolume] = useState(1);

  const { playAudio: playStartSE, onChangeAudio: onChangeStartAudio } = useAudio(startSE?.file, volume);
  const { playAudio: playEndSE, onChangeAudio: onChangeEndAudio } = useAudio(endSE?.file, volume);

  const setStartSE = (file: string | File) => {
    db.soundEffects.update(1, { file });
    onChangeStartAudio(file);
  };
  const setEndSE = (file: string | File) => {
    db.soundEffects.update(2, { file });
    onChangeEndAudio(file);
  };

  return {
    startSE,
    endSE,
    playStartSE,
    playEndSE,
    setStartSE,
    setEndSE,
    volume,
    setVolume,
  };
};

export const useNotification = () => {
  const pushNotification = useCallback((title: string, icon: string) => {
    const notification = new Notification(title, { icon, silent: true });
    setTimeout(notification.close.bind(notification), 6000);
  }, []);

  const onWorkNotification = useCallback(
    () => pushNotification('作業開始', '/notification/icon-work.png'),
    [pushNotification],
  );

  const onBreakNotification = useCallback(
    () => pushNotification('休憩開始', '/notification/icon-break.png'),
    [pushNotification],
  );

  const onLongBreakNotification = useCallback(
    () => pushNotification('ロング休憩開始', '/notification/icon-long-break.png'),
    [pushNotification],
  );

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return {
    onWorkNotification,
    onBreakNotification,
    onLongBreakNotification,
  };
};
