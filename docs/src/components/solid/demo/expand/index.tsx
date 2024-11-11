import type { Setter } from 'solid-js';
import { Button } from '@repo/shared';
import { toast } from 'somoto';

import { CodeBlock } from '../../code-block';
import { ContentLayout } from '../../layout';

export const Expand = (props: { expand: boolean; setExpand: Setter<boolean> }) => {
  return (
    <ContentLayout.Wrapper title="Expand">
      <ContentLayout.Description>
        You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
      </ContentLayout.Description>
      <ContentLayout.ButtonGroup>
        <Button
          data-active={props.expand}
          onClick={() => {
            props.setExpand(true);
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
          }}
        >
          Expand
        </Button>
        <Button
          data-active={!props.expand}
          onClick={() => {
            props.setExpand(false);
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            });
          }}
        >
          Default
        </Button>
      </ContentLayout.ButtonGroup>
      <CodeBlock>{`<Toaster expand={${props.expand}} />`}</CodeBlock>
    </ContentLayout.Wrapper>
  );
};
