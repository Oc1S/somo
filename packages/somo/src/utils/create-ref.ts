import { MutableRefObject, RefObject } from './safe-react-types';

type CreateRef = {
  <T>(value: T): MutableRefObject<T>;
  <T>(value?: T | null): RefObject<T>;
};

export const createRef: CreateRef = value => {
  return {
    current: value,
  };
};
