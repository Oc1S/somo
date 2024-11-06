import { createSignal, For } from 'solid-js';
import { toast, Toaster } from 'somoto';

import { Button } from './ui/button';

const duration = 300_000;
let index = 0;
const types = ['default', 'action', 'success', 'info', 'warning', 'error', 'loading'] as const;
const positions = [
  'bottom-right',
  'bottom-center',
  'bottom-left',
  'top-right',
  'top-center',
  'top-left',
] as const;
export const Somoto = () => {
  const [type, setType] = createSignal<(typeof types)[number]>(types[0]);
  const [position, setPosition] = createSignal<(typeof positions)[number]>(positions[0]);

  const message = () => `Hello World_${index++}!`;

  const showToast = () => {
    switch (type()) {
      case 'default':
        toast(message(), {
          position: position(),
          duration,
        });
        break;
      case 'info':
        toast.info(message(), {
          position: position(),
          duration,
        });
        break;
      case 'success':
        toast.success(message(), {
          position: position(),
          duration,
        });
        break;
      case 'warning':
        toast.warning(message(), {
          position: position(),
          duration,
        });
        break;
      case 'error':
        toast.error(message(), {
          position: position(),
          duration,
        });
        break;
      case 'action':
        toast(message(), {
          position: position(),
          duration,
          action: {
            label: 'hi',
            onClick: () => console.log('hi there'),
          },
        });
        break;
    }
  };

  return (
    <>
      <div class="flex flex-col items-center gap-8">
        <div class="flex gap-4">
          <For each={types}>
            {type => {
              return (
                <Button
                  onClick={() => {
                    setType(type);
                    showToast();
                  }}
                >
                  {type}
                </Button>
              );
            }}
          </For>
        </div>

        <div class="flex gap-4">
          <For each={positions}>
            {position => {
              return (
                <Button
                  onClick={() => {
                    setPosition(position);
                    showToast();
                  }}
                >
                  {position}
                </Button>
              );
            }}
          </For>
        </div>
      </div>
      <Toaster position={position()}></Toaster>
    </>
  );
};

export default function SomotoTest() {
  return (
    <>
      <Somoto></Somoto>
    </>
  );
}
