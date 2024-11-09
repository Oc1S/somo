import type { JSX, ParentComponent } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import { Motion } from 'somo';

import { cn } from '../utils';

export const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const [, rest] = splitProps(props, ['class', 'children']);
  const [pressed, setPressed] = createSignal(false);

  return (
    <Motion.button
      data-pressed={pressed()}
      class={cn(
        'relative flex min-h-9 cursor-pointer appearance-none items-center gap-2 overflow-hidden text-nowrap rounded-lg bg-white px-4 text-sm text-black outline-none transition hover:opacity-95 focus:opacity-95 data-[pressed=true]:scale-[0.97]',
        props.class,
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      {...rest}
    >
      {props.children}
    </Motion.button>
  );
};
