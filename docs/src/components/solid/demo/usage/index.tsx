import { CodeBlock } from '../../code-block';
import { ContentBlock } from '../../content-block';

const snipper = `import { Toaster, toast } from 'somoto'

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>
  )
}`;

export const Usage = () => {
  return (
    <ContentBlock title="Usage">
      <p class="my-2">Render the toaster in the root of your app.</p>
      <CodeBlock>{snipper}</CodeBlock>
    </ContentBlock>
  );
};
