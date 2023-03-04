import {createContext, KeyboardEvent} from 'react';
import {LeaderboardDataViewType, SnakeBodyPart} from '@/types';

type ControllerContext = {
  points: number;
  leaderboardData: LeaderboardDataViewType[];
  snakeBody: SnakeBodyPart[];
  appleCoords: number;
  onKeyPressed: (event: KeyboardEvent) => void;
  onPause: () => void;
  onStartOver: () => void;
};

export const ControllerContext = createContext<ControllerContext | null>(null);
