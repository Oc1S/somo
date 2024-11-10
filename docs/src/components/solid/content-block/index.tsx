import type { JSX, ParentComponent } from 'solid-js';

export const ContentBlock: ParentComponent<{
  title?: JSX.Element;
}> = props => {
  return (
    <div>
      <div class="my-2 text-2xl font-bold">{props.title}</div>
      {props.children}
    </div>
  );
};
