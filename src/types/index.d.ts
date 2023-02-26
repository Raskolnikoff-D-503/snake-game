import {KEYBOARD_DIRECTION} from '@/constants';

export type ControlKeys = keyof typeof KEYBOARD_DIRECTION;

export type SnakeBodyPart = {
  coords: number;
  direction: number;
};
