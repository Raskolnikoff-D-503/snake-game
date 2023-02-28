export const SPEED = 100;
export const BOARD_SIZE = {
  SMALL: 300,
  MEDIUM: 400,
  LARGE: 500,
} as const;

export const DIRECTION = {
  UP: -20,
  RIGHT: 1,
  DOWN: 20,
  LEFT: -1,
} as const;

export const KEYBOARD_DIRECTION = {
  w: DIRECTION.UP,
  d: DIRECTION.RIGHT,
  s: DIRECTION.DOWN,
  a: DIRECTION.LEFT,
} as const;
