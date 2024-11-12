import './index.css';

import { For } from 'solid-js';
import { Button } from '@repo/shared';
import { toast } from 'somoto';

export const Hero = () => {
  return (
    <div class="mb-5 mt-20 flex flex-col items-center">
      <div class="toast-wrapper relative mx-auto flex h-[100px] w-[396px] flex-col">
        <For each={Array.from({ length: 3 })}>
          {() => (
            <div class="toast absolute bottom-0 left-1/2 h-[40px] w-[396px] -translate-x-1/2 rounded-md border border-[#414444] bg-black shadow-[0_4px_12px_#0000001a]" />
          )}
        </For>
      </div>
      <h1 class="-mt-6 text-4xl">Somoto</h1>
      <div class="mb-2 mt-4">
        All you need for 🍞<span class="text-[#e0e198]">toast</span>&nbsp;in SolidJS.
      </div>
      <div class="text-xs text-gray-400">
        A SolidJS port of&nbsp;
        <a href="https://github.com/emilkowalski/sonner" class="text-gray-300" target="_blank">
          Sonner
        </a>
      </div>
      <div class="mt-6 flex gap-4">
        <Button
          onClick={() => {
            toast('Have a Toast!');
          }}
        >
          Render A Toast
        </Button>
        <Button as="a" href="https://github.com/Oc1S/somo" target="_blank">
          Github
        </Button>
      </div>
    </div>
  );
};
