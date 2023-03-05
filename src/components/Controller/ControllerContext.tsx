import {createContext} from 'react';
import {LeaderboardDataViewType, SnakeBodyPart, StatusType} from '@/types';

type ControllerContext = {
  status: StatusType;
  points: number;
  leaderboardData: LeaderboardDataViewType[];
  snakeBody: SnakeBodyPart[];
  appleCoords: number;
  isModalOpen: boolean;
  onPauseClick: () => void;
  onStartOverClick: () => void;
  onSaveClick: (value: string) => void;
};

export const ControllerContext = createContext<ControllerContext | null>(null);
