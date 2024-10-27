import { createSignal, Show } from 'solid-js';
import { Motion, Presence } from 'somo';

export default function SomoTest() {
  const [visible, setVisible] = createSignal(true);

  return (
    <div class="mx-auto p-4 text-center">
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
              setVisible(false);
            }}
          />
        </Show>
      </Presence>
    </div>
  );
}
