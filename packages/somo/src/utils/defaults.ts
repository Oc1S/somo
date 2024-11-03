// import type {
//   Keyframes,
//   KeyframesTarget,
//   PopmotionTransitionProps,
//   SingleTarget,
//   Spring,
//   ValueTarget,
// } from '../types';

import { spring } from '@motionone/dom';
import type { KeyframeOptions } from '@motionone/types';

import { objectKeys } from './helper';

type ValueTarget = string | number;

export function isKeyframesTarget(v: ValueTarget) {
  return Array.isArray(v);
}

export function underDampedSpring(): KeyframeOptions {
  return {
    easing: spring({
      stiffness: 500,
      damping: 25,
      restSpeed: 10,
    }),
  };
}

export function criticallyDampedSpring(): KeyframeOptions {
  return {
    easing: spring({
      stiffness: 550,
      damping: 30,
      restSpeed: 10,
    }),
  };
}

export function overDampedSpring(): KeyframeOptions {
  return {
    easing: spring({
      stiffness: 550,
      damping: 30,
      restSpeed: 10,
    }),
  };
}

export function linear(): KeyframeOptions {
  return {
    easing: 'linear',
  };
}

const defaultSpring = () => ({
  easing: spring({
    stiffness: 140,
    damping: 14,
    restSpeed: 5,
  }),
});

export const defaultTransitions = {
  // default: overDampedSpring,
  // x: underDampedSpring,
  // y: underDampedSpring,
  // z: underDampedSpring,
  // rotate: underDampedSpring,
  // rotateX: underDampedSpring,
  // rotateY: underDampedSpring,
  // rotateZ: underDampedSpring,
  // scaleX: criticallyDampedSpring,
  // scaleY: criticallyDampedSpring,
  // scale: criticallyDampedSpring,
  // default: linear,
  x: defaultSpring,
  y: defaultSpring,
  z: defaultSpring,
  rotate: defaultSpring,
  rotateX: defaultSpring,
  rotateY: defaultSpring,
  rotateZ: defaultSpring,
  scaleX: defaultSpring,
  scaleY: defaultSpring,
  scale: defaultSpring,
  // backgroundColor: linear,
  // color: linear,
  // opacity: linear,
};
export const defaultTransitionKeys = new Set(objectKeys(defaultTransitions));

// export function getDefaultTransition(valueKey: string) {
//   return (
//     defaultTransitions[valueKey as keyof typeof defaultTransitions] || defaultTransitions.default
//   );
// }
