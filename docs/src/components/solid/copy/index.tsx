import type { Component, JSX } from 'solid-js';
import { createSignal, onCleanup, Show } from 'solid-js';
import { combineProps } from '@solid-primitives/props';
import copy from 'copy-to-clipboard';
import { m, Presence } from 'somo';

import { Check, Clipboard } from '../icons';

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export const Copy: Component<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & { content: string }
> = props => {
  const [copying, setCopying] = createSignal(0);

  const onCopy = () => {
    copy(props.content);
    setCopying(c => c + 1);
    const timer = setTimeout(() => {
      setCopying(c => c - 1);
    }, 2000);
    onCleanup(() => clearTimeout(timer));
  };

  const combined = combineProps(
    {
      onClick: onCopy,
    },
    props,
  );

  return (
    <button aria-label="Copy code" {...combined}>
      <Presence initial={false} mode="out-in">
        <Show
          when={copying()}
          fallback={
            <m.div animate="visible" exit="hidden" initial="hidden" variants={variants}>
              <Clipboard />
            </m.div>
          }
        >
          <m.div animate="visible" exit="hidden" initial="hidden" variants={variants}>
            <Check />
          </m.div>
        </Show>
      </Presence>
    </button>
  );
};
