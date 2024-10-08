import { createSignal, For, Index, Show } from 'solid-js';
import { createAutoAnimate, Motion } from 'somo';

/* 目前只发现监听了childList变化的情况，resizeObserver待观察 */
export const AutoAnimate = () => {
  const [parent] = createAutoAnimate(/* optional config */);

  const [list, setList] = createSignal(['Home', 'Settings', 'Logout']);
  const [expand, setExpand] = createSignal(false);
  const [isExpanded, setIsExpanded] = createSignal(true);

  return (
    <div
      class="mt-20"
      ref={parent}
      classList={{
        'mt-80': expand(),
      }}
    >
      <Show when={isExpanded()} keyed>
        <ul class="drawer">
          <For each={list()}>{item => <li class="item">{item}</li>}</For>
        </ul>
      </Show>
      <button
        // initial={{
        //   scale: 0,
        // }}
        // animate={{
        //   scale: 1,
        // }}
        // transition={{
        //   duration: 0.5,
        // }}
        class="h-10 min-w-12 rounded-lg bg-white px-4"
        onClick={() => {
          setList(prev => [...prev.reverse()]);
          // setExpand(!expand());
          // setIsExpanded(prev => !prev);
        }}
      >
        Toggle
      </button>
    </div>
  );
};
