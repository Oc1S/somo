import type { JSX, ParentComponent } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import clsx from 'clsx';
import { Motion } from 'somo';

export const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const [, rest] = splitProps(props, ['class', 'children']);
  const [pressed, setPressed] = createSignal(false);
  return (
    <Motion.button
      data-pressed={pressed()}
      class={clsx(
        'relative flex min-h-9 appearance-none items-center gap-2 overflow-hidden text-nowrap rounded-lg bg-white px-4 text-sm text-black outline-none transition hover:opacity-95 focus:opacity-95 data-[pressed=true]:scale-[0.97]',
        props.class,
      )}
      style={{
        'text-transform': 'none',
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      {...rest}
    >
      {props.children}
    </Motion.button>
  );
};
