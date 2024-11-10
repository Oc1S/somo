import { Copy } from '../../copy';
import styles from './installation.module.css';

export const Installation = () => {
  const content = 'npm install somoto';
  return (
    <div>
      <div class="my-2 text-xl">Installation</div>
      <code class={styles.code}>
        {content}
        <Copy content={content} class={styles.copy} />
      </code>
    </div>
  );
};
