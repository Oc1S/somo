import { createContext } from 'solid-js';
import type { AnimationOptionsWithOverrides } from '@motionone/dom';

export const MotionConfig = createContext<{
  transition?: AnimationOptionsWithOverrides;
}>({});
