import { Accessor, createEffect, onCleanup, useContext } from 'solid-js';
import { createMotionState, createStyles, MotionState, style } from '@motionone/dom';

import { PresenceContext, PresenceContextState } from './presence.jsx';
import { Options } from './types.js';

/** @internal */
export function createAndBindMotionState(
  el: () => Element,
  options: Accessor<Options>,
  presence_state?: PresenceContextState,
  parent_state?: MotionState,
): [MotionState, ReturnType<typeof createStyles>] {
  const motionState = createMotionState(
    presence_state?.initial === false ? { ...options(), initial: false } : options(),
    parent_state,
  );

  createEffect(() => {
    const target = motionState.getTarget();
    console.log(target, createStyles(target), '@@');
  });

  createEffect(() => {
    /* 
    Motion components under <Presence exitBeforeEnter> should wait before animating in this is done with additional signal, because effects will still run immediately
     */
    if (presence_state && !presence_state.mount()) return;

    const element = el(),
      unmount = motionState.mount(element);

    /* 触发状态变化 */
    createEffect(() => motionState.update(options()));

    onCleanup(() => {
      /* 需要等到dom消失的情况 */
      if (presence_state && options().exit) {
        motionState.setActive('exit', true);
        element.addEventListener('motioncomplete', unmount);
        /* 直接调用motionState unmount */
      } else unmount();
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
