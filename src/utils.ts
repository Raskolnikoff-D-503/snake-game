import {ControlKeys, LeaderboardDataType, LeaderboardDataViewType, ScoreInfoType} from '@/types';
import {MAX_NUMBER_OF_LEADERS} from './constants';

export const isControlKeys = (value: string): value is ControlKeys =>
  value === 'w' || value === 'a' || value === 's' || value === 'd';

export const getRandomCoordinates = (): number => Math.floor(Math.random() * 625);

const getMaxSubIndexFromArray = (data: ScoreInfoType[]) =>
  Math.max(...data.map((item) => item.subIndex));

const getSerialNumber = (index: number): string => (index + 1).toString().padStart(2, '0');

const getLeaderInfo = (item: LeaderboardDataType | null): string =>
  item !== null ? `${item.name}: ${item.score.number}` : '---';

export const getScoreInfo = (item: string): ScoreInfoType => ({
  number: Number(item.split('_')[0]),
  subIndex: Number(item.split('_')[1]),
});

export const getCurrentScoreInfo = (current: number, scores: ScoreInfoType[]): ScoreInfoType => {
  if (scores.some((score) => score.number === current)) {
    const filteredScores = scores.filter((item) => item.number === current);
    const maxSubIndex = getMaxSubIndexFromArray(filteredScores);

    return {number: current, subIndex: maxSubIndex + 1};
  }

  return {number: current, subIndex: 1};
};

export const getLeaderboardViewData = (data: Storage): LeaderboardDataViewType[] => {
  const sortedArray: (LeaderboardDataType | null)[] = Object.entries(data)
    .map((item) => ({name: item[1], score: getScoreInfo(item[0])}))
    .sort((a, b) => b.score.number - a.score.number);

  if (sortedArray.length < MAX_NUMBER_OF_LEADERS) {
    const emptyArray: null[] = new Array(MAX_NUMBER_OF_LEADERS - sortedArray.length).fill(null);
    sortedArray.push(...emptyArray);
  }

  return sortedArray.map((item, index) => ({
    serialNumber: getSerialNumber(index),
    info: getLeaderInfo(item),
  }));
};

export const transformToStorageData = (data: ScoreInfoType): string =>
  `${data.number}_${data.subIndex}`;

export const getMinStorageData = (data: ScoreInfoType[]): string => {
  const minNumber = Math.min(...data.map((item) => item.number));
  const filteredScores = data.filter((item) => item.number === minNumber);
  const maxSubIndex = getMaxSubIndexFromArray(filteredScores);
  const itemToDelete = filteredScores.find((item) => item.subIndex === maxSubIndex);

  if (itemToDelete) {
    return transformToStorageData(itemToDelete);
  }

  return '';
};
