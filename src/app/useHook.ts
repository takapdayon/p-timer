import { db } from '@/app/db.';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useEffect, useRef } from 'react';

export const useAudio = (object: string | File | undefined) => {
  const audio = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (object) {
      const url = object instanceof File ? URL.createObjectURL(object) : object;
      audio.current = new Audio(url);
    }
  }, [object]);

  const playAudio = useCallback(() => {
    audio.current?.play();
  }, [audio]);

  const onChangeAudio = useCallback((object: string | File) => {
    const url = object instanceof File ? URL.createObjectURL(object) : object;
    audio.current = new Audio(url);
  }, []);

  return {
    playAudio,
    onChangeAudio,
  };
};

export const useSoundEffects = () => {
  const startSE = useLiveQuery(() => db.soundEffects.where('startOrEnd').equals('start').first(), []);
  const endSE = useLiveQuery(() => db.soundEffects.where('startOrEnd').equals('end').first(), []);

  const { playAudio: playStartSE, onChangeAudio: onChangeStartAudio } = useAudio(startSE?.file);
  const { playAudio: playEndSE, onChangeAudio: onChangeEndAudio } = useAudio(endSE?.file);

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
  };
};
