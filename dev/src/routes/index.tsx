import { batch, createSignal, Show } from 'solid-js';
import { Motion, Presence } from 'somo';

import { AutoAnimate } from '~/components';

export default function Home() {
  const [visible, setVisible] = createSignal(true);
  const [count, setCount] = createSignal(0);

  return (
    <main class="mx-auto p-4 text-center">
      <Presence>
        <Show when={visible()}>
          <Motion
            class="h-40 w-40 cursor-pointer rounded bg-white"
            animate={{
              scale: [0, 1],
              rotate: [0, 360],
              borderRadius: ['0%', '50%'],
              x: [0, 400],
            }}
            exit={{
              scale: 0,
            }}
            transition={{
              duration: 1,
              easing: 'ease-in-out',
              repeat: 5,
            }}
            onClick={() => {
              batch(() => {
                setVisible(false);
                setCount(count() + 1);
              });
            }}
            // initial={{ y: 10 }}
            // animate={{
            //   backgroundColor: ['red', 'blue', 'green'],
            // }}
            // transition={{
            //   duration: 5,
            // }}
            // whileHover={{ scale: 1.2, y: 200 }}
          />
        </Show>
      </Presence>
      <AutoAnimate></AutoAnimate>
    </main>
  );
}
