import { createSignal } from 'solid-js';
import { Toaster } from 'somoto';

import { Hero } from '../hero';
import { Installation } from './installation';
import { type Position, Positions } from './positions';
import { Types } from './types';
import { Usage } from './usage';

export const Somoto = () => {
  const [theme] = createSignal<'light' | 'dark'>('light');
  const [currentPosition, setCurrentPosition] = createSignal<Position>('bottom-right');

  const [richColors, setRichColors] = createSignal(false);
  const [closeButton, setCloseButton] = createSignal(false);

  return (
    <>
      <Toaster
        theme={theme()}
        position={currentPosition()}
        richColors={richColors()}
        closeButton={closeButton()}
      />
      <Hero />
      <div class="flex flex-col items-center gap-8">
        <Installation />
        <Usage />
        <Types />
        <Positions position={currentPosition()} setPosition={setCurrentPosition} />
      </div>
    </>
  );
};
