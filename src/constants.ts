export const SPEED = 100;
export const BOARD_SIZE = 625;

export const DIRECTION = {
  UP: -25,
  RIGHT: 1,
  DOWN: 25,
  LEFT: -1,
} as const;

export const CONTROL_KEYS = {
  UP: 'w',
  RIGHT: 'd',
  DOWN: 's',
  LEFT: 'a',
} as const;

export const KEYBOARD_DIRECTION = {
  [CONTROL_KEYS.UP]: DIRECTION.UP,
  [CONTROL_KEYS.RIGHT]: DIRECTION.RIGHT,
  [CONTROL_KEYS.DOWN]: DIRECTION.DOWN,
  [CONTROL_KEYS.LEFT]: DIRECTION.LEFT,
} as const;
