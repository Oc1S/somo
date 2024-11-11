import type { JSX } from 'solid-js';
import { type Component } from 'solid-js';

import { cn } from '../../../utils';
import { Copy } from '../copy';

export const CodeBlock: Component<{
  children: string;
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement>;
}> = props => {
  return (
    <div
      {...props.wrapperProps}
      class={cn(
        'group relative rounded-lg border border-[#222] bg-[#111] p-3 text-sm',
        props.wrapperProps?.class,
      )}
    >
      <Copy
        class={
          'absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 data-[copying=true]:opacity-100'
        }
        content={props.children}
      />
      <pre class="text-[#eee]">
        {/* <code>{props.children}</code> */}
        {props.children}
      </pre>
    </div>
  );
};
