import { createSignal, For, Match, Switch } from 'solid-js';

import Somo from '~/components/somo';
import Somoto from '~/components/somoto';
import { Button } from '~/components/ui/button';

export default function Home() {
  const demoList = ['somo', 'somoto'] as const;
  const [type, setType] = createSignal<'somo' | 'somoto'>('somoto');

  return (
    <main class="mx-auto flex flex-col gap-8 overflow-x-hidden p-8 text-center">
      <div class="flex items-center justify-center gap-4">
        <For each={demoList}>
          {item => {
            return (
              <Button class="" onClick={() => setType(item)}>
                {item}
              </Button>
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
