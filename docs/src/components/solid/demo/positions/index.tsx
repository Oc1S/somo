import { type Component, For, type Setter } from 'solid-js';
import { Button } from '@repo/shared';
import { toast, useSomoto } from 'somoto';

import { CodeBlock } from '../../code-block';
import { ContentLayout } from '../../layout';

const positions = [
  'bottom-right',
  'bottom-center',
  'bottom-left',
  'top-right',
  'top-center',
  'top-left',
] as const;
export type Position = (typeof positions)[number];

export const Positions: Component<{
  position: Position;
  setPosition: Setter<Position>;
}> = props => {
  const { toasts } = useSomoto();

  function removeAllToasts() {
    toasts().forEach(t => toast.dismiss(t.id));
  }
  return (
    <ContentLayout.Wrapper title="Positions">
      <ContentLayout.Description>
        <p>Swipe direction changes depending on the position.</p>
      </ContentLayout.Description>
      <ContentLayout.ButtonGroup>
        <For each={positions}>
          {position => {
            const active = () => position === props.position;
            return (
              <Button
                class={active() ? 'bg-gray-200' : ''}
                onClick={() => {
                  props.setPosition(position);
                  removeAllToasts();
                  toast('Event has been created', {
                    description: 'Monday, January 3rd at 6:00pm',
                  });
                }}
              >
                {position}
              </Button>
            );
          }}
        </For>
      </ContentLayout.ButtonGroup>
      <CodeBlock>{`<Toaster position="${props.position}" />`}</CodeBlock>
    </ContentLayout.Wrapper>
  );
};
