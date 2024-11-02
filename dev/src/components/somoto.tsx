import { toast, Toaster } from 'somoto';

import { Button } from './ui/button';

const duration = 300_000;
export const Somoto = () => {
  return (
    <>
      <div class="flex gap-4">
        <Button
          onClick={() => {
            toast('Hello World!', {
              duration: duration,
            });
          }}
        >
          Toast!
        </Button>
        <Button
          onClick={() => {
            toast.warning('Hello World!', {
              duration: duration,
            });
          }}
        >
          Warning
        </Button>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default function SomotoTest() {
  return (
    <>
      <Somoto></Somoto>
    </>
  );
}
