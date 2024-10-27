import { createSignal, onMount } from 'solid-js';

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = createSignal(false);
  onMount(() => {
    setIsMounted(true);
  });
  return isMounted;
};
