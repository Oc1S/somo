import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';

import { getUniqueID } from '~/utils';

export type RippleType = {
  key: Key;
  x: number;
  y: number;
  size: number;
};

export interface UseRippleProps {}

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = createSignal<RippleType[]>([]);

  const onClick: JSX.EventHandler<HTMLSpanElement, MouseEvent> = event => {
    const trigger = event.currentTarget;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();

    setRipples(prevRipples => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
      },
    ]);
  };

  const onClear = (key: Key) => {
    setRipples(prevState => prevState.filter(ripple => ripple.key !== key));
  };

  return { ripples, onClick, onClear, ...props };
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
