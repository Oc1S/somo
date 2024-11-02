import { toast, Toaster } from 'somoto';

export const Somoto = () => {
  return (
    <div class="flex gap-4">
      <button
        class="rounded-md bg-white px-4 py-1.5 text-black"
        onClick={() => {
          toast('Hello World!', {
            duration: 30_000,
          });
        }}
      >
        Toast!
      </button>
    </div>
  );
};

export default function SomotoTest() {
  return (
    <>
      <Toaster></Toaster>
      <Somoto></Somoto>
    </>
  );
}
