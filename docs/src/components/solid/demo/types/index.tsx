import { createSignal, For } from 'solid-js';
import { Button } from '@repo/shared';
import { toast } from 'somoto';

import { CodeBlock } from '../../code-block';
import { ContentLayout } from '../../layout';

const promiseCode = '`${data.name} has been done`';
const types = [
  {
    name: 'Default',
    snippet: `toast('Event has been created')`,
    action: () => toast('Event has been created'),
  },
  {
    name: 'Description',
    snippet: `toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})`,
    action: () =>
      toast('Event has been created', {
        description: 'Monday, January 3rd at 6:00pm',
      }),
  },
  {
    name: 'Success',
    snippet: `toast.success('Event has been created')`,
    action: () => toast.success('Event has been created'),
  },
  {
    name: 'Info',
    snippet: `toast.info('Be at the area 10 minutes before the event time')`,
    action: () => toast.info('Be at the area 10 minutes before the event time'),
  },
  {
    name: 'Warning',
    snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
    action: () => toast.warning('Event start time cannot be earlier than 8am'),
  },
  {
    name: 'Error',
    snippet: `toast.error('Event has not been created')`,
    action: () => toast.error('Event has not been created'),
  },
  {
    name: 'Action',
    snippet: `toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})`,
    action: () =>
      toast.message('Event has been created', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      }),
  },
  {
    name: 'Promise',
    snippet: `toast.promise<{ name: string }>(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: 'Cook' });
      }, 2000);
    }),
  {
    loading: 'Loading...',
    success: data => {
      return ${promiseCode};
    },
    error: 'Error',
  },
),`,
    action: () =>
      toast.promise<{ name: string }>(
        () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve({ name: 'Cook' });
            }, 2000);
          }),
        {
          loading: 'Loading...',
          success: data => {
            return `${data.name} has been done`;
          },
          error: 'Error',
        },
      ),
  },
  {
    name: 'Custom',
    snippet: `toast(<div>A custom toast with default styling</div>)`,
    action: () => toast(<div>A custom toast with default styling</div>, { duration: 1000000 }),
  },
];

export const Types = () => {
  const [currentType, setCurrentType] = createSignal<(typeof types)[number]>(types[0]);
  return (
    <ContentLayout.Wrapper title="Types">
      <ContentLayout.Description>
        <p>Swipe direction changes depending on the position.</p>
      </ContentLayout.Description>
      <ContentLayout.ButtonGroup>
        <For each={types}>
          {type => {
            const active = () => type === currentType();
            return (
              <Button
                class={active() ? 'bg-gray-200' : ''}
                onClick={() => {
                  type.action();
                  setCurrentType(type);
                }}
              >
                {type.name}
              </Button>
            );
          }}
        </For>
      </ContentLayout.ButtonGroup>
      <CodeBlock>{`${currentType().snippet}`}</CodeBlock>
    </ContentLayout.Wrapper>
  );
};
