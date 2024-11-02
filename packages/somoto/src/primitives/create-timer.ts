import { onCleanup } from 'solid-js';

export const createTimer = (ms: number, onTimeout: () => void) => {
  let closeTimerStartTime = 0;
  let lastCloseTimerStartTime = 0;
  let timeoutId: ReturnType<typeof setTimeout>;
  let remainingTime = ms;

  // Pause the timer on each hover
  const pauseTimer = () => {
    if (lastCloseTimerStartTime < closeTimerStartTime) {
      // Get the elapsed time since the timer started
      const elapsedTime = Date.now() - closeTimerStartTime;
      remainingTime = remainingTime - elapsedTime;
    }

    lastCloseTimerStartTime = Date.now();
  };

  const startTimer = () => {
    // setTimeout(callback, Infinity) behaves as if the delay is 0.
    // As a result, the toast would be closed immediately, giving the appearance that it was never rendered.
    if (remainingTime === Infinity) return;
    closeTimerStartTime = Date.now();
    // Let the toast know it has started
    timeoutId = setTimeout(onTimeout, remainingTime);
  };

  onCleanup(() => clearTimeout(timeoutId));
  return {
    startTimer,
    pauseTimer,
  };
};
