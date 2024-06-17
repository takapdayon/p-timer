// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface SoundEffect {
  id: number;
  startOrEnd: 'start' | 'end';
  file: File | string;
}

const db = new Dexie('CacheDB') as Dexie & {
  soundEffects: EntityTable<
    SoundEffect,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  soundEffects: '++id, startOrEnd, file', // primary key "id" (for the runtime!)
});

// 初期データの挿入
db.on('populate', async () => {
  await db.soundEffects.bulkAdd([
    { startOrEnd: 'start', file: '/default.mp3' },
    { startOrEnd: 'end', file: '/default.mp3' },
  ]);
});

export { db };
export type { SoundEffect };
