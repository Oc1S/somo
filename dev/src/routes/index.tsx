import { batch, createEffect, createSignal, Show } from 'solid-js';
import { Motion, Presence, spring } from 'somo';

export default function Home() {
  const [visible, setVisible] = createSignal(true);
  const [count, setCount] = createSignal(0);

  setInterval(() => {
    setCount(c => c + 1);
  }, 2000);

  return (
    <main class="mx-auto p-4 text-center">
      <Presence>
        <Show when={visible()}>
          <Motion
            class="h-40 w-40 cursor-pointer bg-white"
            initial={{
              scale: 0,
              rotate: -360,
              borderRadius: '0%',
            }}
            animate={{
              scale: 1,
              rotate: 360,
              borderRadius: '50%',
              x: 400,
            }}
            // animate={{
            //   scale: [0, 1],
            //   rotate: [-360, 360],
            //   borderRadius: ['0%', '50%'],
            //   x: [0, 400],
            // }}
            transition={{
              duration: 0.3,
            }}
            exit={{
              scale: 0,
              rotate: -360,
              borderRadius: '0%',
            }}
            onClick={() => {
              batch(() => {
                setVisible(false);
                setCount(count() + 1);
              });
            }}
          />
        </Show>
      </Presence>
    </main>
  );
}
