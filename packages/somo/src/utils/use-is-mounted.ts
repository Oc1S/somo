import { onCleanup, onMount } from 'solid-js';

import { createRef } from './create-ref';

export function useIsMounted() {
  const isMounted = createRef(false);
  onMount(() => {
    isMounted.current = true;
    onCleanup(() => {
      isMounted.current = false;
    });
  });

  return isMounted;
}
