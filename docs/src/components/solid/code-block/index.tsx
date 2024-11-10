import { type Component } from 'solid-js';

import { Copy } from '../copy';
import styles from './index.module.css';

export const CodeBlock: Component<{
  children: string;
}> = props => {
  return (
    <div class={styles.outerWrapper}>
      <Copy class={styles.copyButton} content={props.children} />
      <pre>
        <code>{props.children}</code>
      </pre>
    </div>
  );
};
