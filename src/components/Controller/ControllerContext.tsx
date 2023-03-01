import {createContext, KeyboardEvent} from 'react';
import {SnakeBodyPart} from '@/types';

type ControllerContext = {
  points: number;
  snakeCoords: SnakeBodyPart[];
  appleCoords: number;
  onKeyPressed: (event: KeyboardEvent) => void;
  onPause: () => void;
  onStartOver: () => void;
};

export const ControllerContext = createContext<ControllerContext | null>(null);
