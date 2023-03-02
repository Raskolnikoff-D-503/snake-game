export const SPEED = 100;

export const DIRECTION = {
  UP: -20,
  RIGHT: 1,
  DOWN: 20,
  LEFT: -1,
} as const;

export const KEYBOARD = {
  UP: 'w',
  RIGHT: 'd',
  DOWN: 's',
  LEFT: 'a',
} as const;

export const KEYBOARD_DIRECTION = {
  [KEYBOARD.UP]: DIRECTION.UP,
  [KEYBOARD.RIGHT]: DIRECTION.RIGHT,
  [KEYBOARD.DOWN]: DIRECTION.DOWN,
  [KEYBOARD.LEFT]: DIRECTION.LEFT,
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
