import { z } from 'zod';

const commonTime = z
  .number({ message: '0~9の数字で入力してください' })
  .min(1, { message: '1~59の範囲で入力して下さい' })
  .max(59, { message: '1~59の範囲で入力して下さい' });

export const TimeFormSchema = z.object({
  time: commonTime,
  breakTime: commonTime,
  longBreakTime: commonTime,
  needLongBreak: z.boolean(),
  setCount: z.number({ message: '数字を入力してください' }),
});

export const TimeFormDefaultValues = {
  time: 25,
  breakTime: 5,
  longBreakTime: 15,
  needLongBreak: true,
  setCount: 4,
};

export type TimeFormSchema = z.infer<typeof TimeFormSchema>;
