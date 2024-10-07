import { batch, createSignal, Show } from 'solid-js';
import { Motion, Presence } from 'somo';

export default function Home() {
  const [visible, setVisible] = createSignal(true);
  const [count, setCount] = createSignal(0);
  let domRef: HTMLDivElement;

  return (
    <main
      class="mx-auto p-4 text-center"
      onClick={() => {
        domRef.animate(
          [{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(360deg) scale(0)' }],
          {
            duration: 1000,
            iterations: 1,
          },
        );
      }}
    >
      <div class="h-40 w-40 cursor-pointer rounded bg-red-900" ref={domRef!}></div>
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
    </main>
  );
}
