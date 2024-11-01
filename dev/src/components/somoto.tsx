import { onMount } from 'solid-js';
import { toast, Toaster } from 'somoto';
export const Somoto = () => {
  onMount(() => {
    toast('hi');
  });
  return (
    <>
      <Toaster></Toaster>
    </>
  );
};
