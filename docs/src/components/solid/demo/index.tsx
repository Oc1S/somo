import { createSignal } from 'solid-js';
import { Toaster } from 'somoto';

import { Hero } from '../hero';
import { Expand } from './expand';
import { Installation } from './installation';
import { Other } from './other';
import { type Position, Positions } from './positions';
import { Types } from './types';
import { Usage } from './usage';

export const Somoto = () => {
  const [theme] = createSignal<'light' | 'dark'>('light');
  const [currentPosition, setCurrentPosition] = createSignal<Position>('bottom-right');

  const [expand, setExpand] = createSignal(false);
  const [richColors, setRichColors] = createSignal(false);
  const [closeButton, setCloseButton] = createSignal(false);

  return (
    <div class="pb-20">
      <Toaster
        theme={theme()}
        expand={expand()}
        position={currentPosition()}
        richColors={richColors()}
        closeButton={closeButton()}
      />
      <Hero />
      <div class="flex w-[40rem] flex-col gap-10">
        <Installation />
        <Usage />
        <Types />
        <Positions position={currentPosition()} setPosition={setCurrentPosition} />
        <Expand expand={expand()} setExpand={setExpand} />
        <Other setCloseButton={setCloseButton} setRichColors={setRichColors} />
      </div>
    </div>
  );
};
