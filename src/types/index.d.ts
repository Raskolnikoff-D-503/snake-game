import {CONTROL_KEYS, STATUS} from '@/constants';

export type ControlKeys = typeof CONTROL_KEYS[keyof typeof CONTROL_KEYS];
export type StatusType = typeof STATUS[keyof typeof STATUS];

export type SnakeBodyPart = {
  coords: number;
  direction: number;
};

export type ScoreInfoType = {
  number: number;
  subIndex: number;
};

export type LeaderboardDataType = {
  name: string;
  score: ScoreInfoType;
};

export type LeaderboardDataViewType = {
  serialNumber: string;
  info: string;
};
