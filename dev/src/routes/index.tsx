import { createSignal, Match, Switch } from 'solid-js';

import { Somoto } from '~/components/somoto';

export default function Home() {
  const [type, setType] = createSignal('somoto');

  return (
    <main class="mx-auto p-4 text-center">
      <Switch>
        <Match when={type() === 'somoto'}>
          <Somoto />
        </Match>
      </Switch>
    </main>
  );
}
