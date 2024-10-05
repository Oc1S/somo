export { animate, createScopedAnimate } from './animation/animate';
export { animateMini } from './animation/animators/waapi/animate-style';
export { scroll } from './render/dom/scroll';
export { scrollInfo } from './render/dom/scroll/track';
export { inView } from './render/dom/viewport';
export type { PassiveEffect, Subscriber } from './value';
export { MotionValue, motionValue } from './value';

/**
 * Easing
 */
export * from './easing/anticipate';
export * from './easing/back';
export * from './easing/circ';
export * from './easing/cubic-bezier';
export * from './easing/ease';
export * from './easing/modifiers/mirror';
export * from './easing/modifiers/reverse';
export * from './easing/steps';

/**
 * Animation generators
 */
export { inertia } from './animation/generators/inertia';
export { keyframes } from './animation/generators/keyframes';
export { spring } from './animation/generators/spring';

/**
 * Utils
 */
export { stagger } from './animation/utils/stagger';
export * from './frameloop';
export { clamp } from './utils/clamp';
export type { DelayedFunction } from './utils/delay';
export { delayInSeconds as delay } from './utils/delay';
export * from './utils/distance';
export * from './utils/errors';
export * from './utils/interpolate';
export { mix } from './utils/mix';
export { pipe } from './utils/pipe';
export { progress } from './utils/progress';
export { transform } from './utils/transform';
export { wrap } from './utils/wrap';

/**
 * Deprecated
 */
export { cancelSync, sync } from './frameloop/index-legacy';
