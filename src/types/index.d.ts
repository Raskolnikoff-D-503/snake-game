import {CONTROL_KEYS} from '@/constants';

export type ControlKeys = typeof CONTROL_KEYS[keyof typeof CONTROL_KEYS];

export type SnakeBodyPart = {
  coords: number;
  direction: number;
};
