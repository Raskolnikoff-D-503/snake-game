import {ControlKeys} from '@/types';

export const isControlKeys = (value: string): value is ControlKeys =>
  value === 'w' || value === 'a' || value === 's' || value === 'd';

export const getRandomCoordinates = (): number => Math.floor(Math.random() * 400);

export const hasDuplicates = (array: (string | number)[]): boolean =>
  array.some((item, index) => {
    return array.indexOf(item) !== index;
  });
