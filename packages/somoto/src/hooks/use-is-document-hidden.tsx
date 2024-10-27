import { createSignal, onCleanup, onMount } from 'solid-js';

export const useIsDocumentHidden = () => {
  const [isDocumentHidden, setIsDocumentHidden] = createSignal(document?.hidden);

  onMount(() => {
    const callback = () => {
      setIsDocumentHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', callback);
    onCleanup(() => {
      document.removeEventListener('visibilitychange', callback);
    });
  });

  return isDocumentHidden;
};
