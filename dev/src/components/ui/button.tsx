import type { JSX, ParentComponent } from 'solid-js';
import { splitProps } from 'solid-js';
import clsx from 'clsx';

export const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const [, rest] = splitProps(props, ['children']);
  return (
    <button class={clsx('relative min-h-9 rounded-md bg-white px-4 text-sm text-black')} {...rest}>
      {props.children}
    </button>
  );
};
