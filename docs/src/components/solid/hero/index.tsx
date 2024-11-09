import './index.css';

import { For } from 'solid-js';

export const Hero = () => {
  return (
    <div class="mb-10 mt-24 flex flex-col items-center gap-2">
      <div class="toast-wrapper relative mx-auto my-0 flex h-[100px] w-[396px] flex-col">
        <For each={Array.from({ length: 3 })}>
          {() => (
            <div class="toast absolute bottom-0 left-1/2 h-[40px] w-[396px] -translate-x-1/2 rounded-md border border-[#414444] bg-black shadow-[0_4px_12px_#0000001a]"></div>
          )}
        </For>
      </div>
      <h1 class="-mt-8 text-4xl">Somoto</h1>
      <div>
        All you need for 🍞<span class="text-[#abc]">toast</span>&nbsp;in SolidJS
      </div>
      <div class="text-xs text-gray-400">
        A SolidJS port of&nbsp;
        <a href="https://github.com/emilkowalski/sonner" class="text-gray-300" target="_blank">
          Sonner
        </a>
      </div>
    </div>
  );
};
