export const SPEED = 100;

export const DIRECTION = {
  UP: -20,
  RIGHT: 1,
  DOWN: 20,
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

//TODO: make the feature on user board size configuration
export const BOARD_SIZE = {
  SMALL: 300,
  MEDIUM: 400,
  LARGE: 500,
} as const;

//TODO: make the feature on user speed configuration
export const MODES = {
  DYNAMIC_SPEED: 'DYNAMIC_SPEED',
  STATIC_SPEED: 'STATIC_SPEED',
} as const;
