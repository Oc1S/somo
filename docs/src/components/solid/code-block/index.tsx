import { type Component } from 'solid-js';

import { Copy } from '../copy';

export const CodeBlock: Component<{
  children: string;
}> = props => {
  return (
    <div class="group relative rounded-lg border border-[#222] bg-[#111] p-3 text-sm">
      <Copy
        class={
          'absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 data-[copying=true]:opacity-100'
        }
        content={props.children}
      />
      <pre class="text-[#eee]">{props.children}</pre>
    </div>
  );
};
