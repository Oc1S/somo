import type { Component, JSX } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import type { VariantProps } from 'cva';
import { cva } from 'cva';
import { m } from 'somo';

const buttonVariants = cva(
  'relative flex min-h-9 cursor-pointer appearance-none items-center gap-2 overflow-hidden whitespace-nowrap text-nowrap rounded-lg px-4 text-sm text-black outline-none transition hover:opacity-95 focus:opacity-95 data-[pressed=true]:scale-[0.97]',
  {
    variants: {
      variant: {
        default: 'bg-white',
        bordered: 'border bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  bordered?: boolean;
  class?: string;
}

export const Button: Component<ButtonProps> = props => {
  const [, rest] = splitProps(props, ['class', 'children', 'variant']);
  const [pressed, setPressed] = createSignal(false);

  return (
    <m.button
      data-pressed={pressed()}
      class={buttonVariants(props as Parameters<typeof buttonVariants>[0])}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      {...rest}
    >
      {props.children}
    </m.button>
  );
};
