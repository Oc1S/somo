import { createSignal, For, Match, Switch } from 'solid-js';

import Somo from '~/components/somo';
import { Somoto } from '~/components/somoto';

export default function Home() {
  const demoList = ['somo', 'somoto'] as const;
  const [type, setType] = createSignal<'somo' | 'somoto'>('somoto');

  return (
    <main class="mx-auto p-4 text-center">
      <div class="flex items-center justify-center gap-4">
        <For each={demoList}>
          {item => {
            return (
              <div class="" onClick={() => setType(item)}>
                {item}
              </div>
            );
          }}
        </For>
      </div>
      <Switch>
        <Match when={type() === 'somo'}>
          <Somo />
        </Match>
        <Match when={type() === 'somoto'}>
          <Somoto />
        </Match>
      </Switch>
    </main>
  );
}
