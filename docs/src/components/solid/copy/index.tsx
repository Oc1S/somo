import type { Component, JSX } from 'solid-js';
import { createSignal, onCleanup, Show, splitProps } from 'solid-js';
import { combineProps } from '@solid-primitives/props';
import copy from 'copy-to-clipboard';
import { m, Presence } from 'somo';

import { Check, Clipboard } from '../icons';

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export const Copy: Component<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    content: string;
  }
> = props => {
  const [, domProps] = splitProps(props, ['content']);
  const [copying, setCopying] = createSignal(false);

  let timer: ReturnType<typeof setTimeout>;
  const onCopy = () => {
    copy(props.content);
    if (copying()) return;
    setCopying(true);
    timer = setTimeout(() => {
      setCopying(false);
    }, 2000);
  };
  onCleanup(() => {
    clearTimeout(timer);
  });

  const combined = combineProps(
    {
      class:
        'flex h-[26px] w-[26px] items-center cursor-pointer justify-center rounded-md border text-[#eeeeee] transition duration-200 bg-transparent border-[#303030] focus-visible:opacity-100 focus-visible:shadow-[0_0_0_1px_#303030]',
      onClick: onCopy,
    },
    domProps,
  );

  return (
    <button aria-label="Copy code" {...combined} data-copying={copying()}>
      <Presence initial={false} mode="out-in">
        <Show
          when={copying()}
          fallback={
            <m.div
              initial={variants.hidden}
              animate={variants.visible}
              exit={variants.hidden}
              transition={{
                duration: 0.15,
              }}
              class="flex"
            >
              <Clipboard />
            </m.div>
          }
        >
          <m.div
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.hidden}
            transition={{
              duration: 0.15,
            }}
            class="flex"
          >
            <Check />
          </m.div>
        </Show>
      </Presence>
    </button>
  );
};
