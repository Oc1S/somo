import type { Accessor } from 'solid-js';
import { createEffect, createMemo, onCleanup, useContext } from 'solid-js';
import type { MotionState } from '@motionone/dom';
import { createMotionState, createStyles, style } from '@motionone/dom';
import type { KeyframeOptions } from '@motionone/types';
import { isObject } from 'lodash-es';

import type { PresenceContextState } from './components/presence.jsx';
import { PresenceContext } from './components/presence.jsx';
import { MotionConfig } from './context.js';
import type { Options } from './types/index.js';
import { defaultTransitionKeys, defaultTransitions } from './utils/defaults.js';
import { objectKeys } from './utils/helper.js';

const generateTransition = (options: Options) => {
  const keys = new Set<string>();
  objectKeys(options).forEach(key => {
    const variantDef = options[key];
    isObject(variantDef) &&
      objectKeys(variantDef as object).forEach(k => {
        keys.add(k);
      });
  });

  const defaultTransition = [...keys].reduce(
    (obj, key: keyof typeof defaultTransitions) => {
      if (defaultTransitionKeys.has(key)) {
        obj[key] = defaultTransitions[key]();
      }
      return obj;
    },
    {} as Record<string, KeyframeOptions>,
  );

  return defaultTransition;
};

/** @internal */
export function createAndBindMotionState(
  el: () => Element,
  options: Accessor<Options>,
  presenceState?: PresenceContextState,
  parentState?: MotionState,
): [MotionState, ReturnType<typeof createStyles>] {
  const contextConfig = useContext(MotionConfig);

  const computedOptions = createMemo(() => {
    const $options = { ...options() };
    $options.transition =
      $options.transition || contextConfig.transition || generateTransition($options);
    return $options;
  });

  const motionState = createMotionState(
    presenceState?.initial === false ? { ...computedOptions(), initial: false } : computedOptions(),
    parentState,
  );

  createEffect(() => {
    /* 
    Motion components under <Presence exitBeforeEnter> should wait before animating in this is done with additional signal, because effects will still run immediately
     */
    if (presenceState && !presenceState.mount()) return;

    const element = el(),
      unmount = motionState.mount(element);

    /* 触发状态变化 */
    createEffect(() => motionState.update(computedOptions()));

    onCleanup(() => {
      /* 需要等到dom消失的情况 */
      if (presenceState && computedOptions().exit) {
        motionState.setActive('exit', true);
        element.addEventListener('motioncomplete', unmount);
      } else {
        /* 直接调用motionState unmount */
        unmount();
      }
    });
  });

  return [motionState, createStyles(motionState.getTarget())] as const;
}

/**
 * createMotion provides MotionOne as a compact Solid primitive.
 *
 * @param target Target Element to animate.
 * @param options Options to effect the animation.
 * @param presenceState Optional PresenceContext override, defaults to current parent.
 * @returns Object to access MotionState
 */
export function createMotion(
  target: Element,
  options: Accessor<Options> | Options,
  presenceState?: PresenceContextState,
): MotionState {
  const [state, styles] = createAndBindMotionState(
    () => target,
    typeof options === 'function' ? options : () => options,
    presenceState,
  );

  for (const key in styles) {
    style.set(target, key, styles[key]);
  }

  return state;
}

/**
 * motion is a Solid directive that makes binding to elements easier.
 *
 * @param el Target Element to bind to.
 * @param props Options to effect the animation.
 */
export function motion(el: Element, props: Accessor<Options>): void {
  createMotion(el, props, useContext(PresenceContext));
}
