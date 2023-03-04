import {ControlKeys, LeaderboardDataType, LeaderboardDataViewType} from '@/types';
import {MAX_NUMBER_OF_LEADERS} from './constants';

export const isControlKeys = (value: string): value is ControlKeys =>
  value === 'w' || value === 'a' || value === 's' || value === 'd';

export const getRandomCoordinates = (): number => Math.floor(Math.random() * 625);

const getSerialNumber = (index: number): string => (index + 1).toString().padStart(2, '0');
const getLeaderInfo = (item: LeaderboardDataType | null): string =>
  item !== null ? `${item.name}: ${item.score}` : '---';

export const getLeaderboardViewData = (data: Storage): LeaderboardDataViewType[] => {
  const sortedArray: (LeaderboardDataType | null)[] = Object.entries(data)
    .map((item) => ({name: item[1], score: Number(item[0])}))
    .sort((a, b) => b.score - a.score);

  if (sortedArray.length < MAX_NUMBER_OF_LEADERS) {
    const emptyArray: null[] = new Array(MAX_NUMBER_OF_LEADERS - sortedArray.length).fill(null);
    sortedArray.push(...emptyArray);
  }

  return sortedArray.map((item, index) => ({
    serialNumber: getSerialNumber(index),
    info: getLeaderInfo(item),
  }));
};
