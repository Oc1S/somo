import { toast, Toaster } from 'somoto';

export const Somoto = () => {
  return (
    <button
      onClick={() => {
        toast('Hello World!');
      }}
    >
      Toast!
    </button>
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
