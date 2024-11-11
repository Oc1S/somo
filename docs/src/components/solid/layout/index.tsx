import type { JSX, ParentComponent } from 'solid-js';
import { combineProps } from '@solid-primitives/props';

const Wrapper: ParentComponent<{
  title: string;
}> = props => {
  return (
    <div>
      <div class="my-4 flex text-2xl font-bold">{props.title}</div>
      {props.children}
    </div>
  );
};

const ButtonGroup: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = props => {
  const combined = combineProps(props, {
    class: 'my-4 flex flex-wrap gap-4',
  });
  return <div {...combined}>{props.children}</div>;
};

const Description: ParentComponent<JSX.HTMLAttributes<HTMLParagraphElement>> = props => {
  const combined = combineProps(props, {
    class: 'my-2',
  });
  return <p {...combined}>{props.children}</p>;
};

export const ContentLayout = Object.assign({}, { ButtonGroup, Wrapper, Description });
