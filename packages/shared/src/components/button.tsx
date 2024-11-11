import type { Component, ComponentProps } from 'solid-js';
import { createSignal, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { combineProps } from '@solid-primitives/props';
import type { VariantProps } from 'cva';
import { cva } from 'cva';
import { m } from 'somo';
const buttonVariants = cva(
  'relative flex h-9 cursor-pointer appearance-none items-center gap-2 overflow-hidden whitespace-nowrap text-nowrap rounded-lg px-4 text-sm text-black no-underline outline-none transition duration-200 hover:opacity-90 focus:opacity-95 data-[pressed=true]:scale-[0.97]',
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

export type ButtonProps<T extends 'a' | 'button' = 'button'> = VariantProps<typeof buttonVariants> &
  ComponentProps<T>;

export const Button = <T, U extends 'a' | 'button' = T extends { href: string } ? 'a' : 'button'>(
  props: T & ButtonProps<U>,
) => {
  const [, domProps] = splitProps(props, ['class', 'variant']);
  const combined = combineProps(
    {
      onPointerDown: () => setPressed(true),
      onPointerUp: () => setPressed(false),
      onPointerLeave: () => setPressed(false),
    },
    domProps,
  );
  const [pressed, setPressed] = createSignal(false);

  const component = () => ('href' in props ? m.a : m.button);
  return (
    <Dynamic
      data-pressed={pressed()}
      class={buttonVariants(props as Parameters<typeof buttonVariants>[0])}
      {...combined}
      component={component()}
    />
  );
};
