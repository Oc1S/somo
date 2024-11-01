import { createSignal, onCleanup, onMount } from 'solid-js';

import { ToastState } from '../state';
import { ToastType } from '../types';

export const useSomoto = () => {
  const [activeToasts, setActiveToasts] = createSignal<ToastType[]>([]);

  onMount(() => {
    const unSubscribe = ToastState.subscribe(toast => {
      setActiveToasts(currentToasts => {
        if ('dismiss' in toast && toast.dismiss) {
          return currentToasts.filter(t => t.id !== toast.id);
        }

        const existingToastIndex = currentToasts.findIndex(t => t.id === toast.id);
        if (existingToastIndex !== -1) {
          const updatedToasts = [...currentToasts];
          updatedToasts[existingToastIndex] = { ...updatedToasts[existingToastIndex], ...toast };
          return updatedToasts;
        } else {
          return [toast, ...currentToasts];
        }
      });
    });

    onCleanup(unSubscribe);
  });

  return {
    toasts: activeToasts,
  };
};
