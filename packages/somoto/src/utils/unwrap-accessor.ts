import type { Accessor } from 'solid-js';

import type { MaybeAccessor } from '../types';

export const unwrapAccessor = <T>(target: MaybeAccessor<T>) => {
  return typeof target === 'function' ? (target as Accessor<T>)() : target;
};
