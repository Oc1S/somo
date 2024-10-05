import { useContext } from 'solid-js';

import { MotionProps } from '../../motion/types';
import { MotionContext, MotionContextProps } from '.';
import { getCurrentTreeVariants } from './utils';

export function useCreateMotionContext<Instance>(props: MotionProps): MotionContextProps<Instance> {
  const { initial, animate } = getCurrentTreeVariants(props, useContext(MotionContext));
  return { initial, animate };
}
