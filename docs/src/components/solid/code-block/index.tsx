import { type Component, createSignal, Show } from 'solid-js';
import copy from 'copy-to-clipboard';
import { m, Presence } from 'somo';

import styles from './index.module.css';

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export const CodeBlock: Component<{
  children: string;
}> = props => {
  const [copying, setCopying] = createSignal(0);

  const onCopy = () => {
    copy(props.children);
    setCopying(c => c + 1);
    setTimeout(() => {
      setCopying(c => c - 1);
    }, 2000);
  };

  return (
    <div class={styles.outerWrapper}>
      <button class={styles.copyButton} onClick={onCopy} aria-label="Copy code">
        <Presence initial={false} mode="out-in">
          <Show
            when={copying()}
            fallback={
              <m.div animate="visible" exit="hidden" initial="hidden" variants={variants}>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  shape-rendering="geometricPrecision"
                >
                  <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" />
                </svg>
              </m.div>
            }
          >
            <m.div animate="visible" exit="hidden" initial="hidden" variants={variants}>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                shape-rendering="geometricPrecision"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </m.div>
          </Show>
        </Presence>
      </button>
      <pre>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};
