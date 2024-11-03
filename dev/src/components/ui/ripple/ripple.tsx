import type { Component, JSX } from 'solid-js';
import { For, mergeProps, splitProps } from 'solid-js';
import clsx from 'clsx';
import type { MotionProps } from 'somo';
import { Motion } from 'somo';

import { clamp } from '~/utils';

import type { RippleType } from './use-ripple';

export interface RippleProps extends MotionProps<'span'> {
  ripples: RippleType[];
  color?: string;
  style: JSX.CSSProperties;
  onClear: (key: Key) => void;
}

const Ripple: Component<RippleProps> = p => {
  const props = mergeProps(
    {
      ripples: [],
      color: 'currentColor',
    },
    p,
  );
  const [, domProps] = splitProps(props, ['class', 'style']);

  return (
    <For each={props.ripples}>
      {ripple => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        return (
          <Motion.span
            initial={{ transform: 'scale(0)', opacity: 0.35 }}
            animate={{ transform: 'scale(2)', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            {...domProps}
            class={clsx(
              'pointer-events-none absolute inset-0 z-0 origin-center overflow-hidden rounded-full',
              props.class,
            )}
            style={{
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              'background-color': props.color,
              ...props.style,
            }}
            onMotionComplete={() => {
              props.onClear(ripple.key);
            }}
          />
        );
      }}
    </For>
  );
};

export default Ripple;
