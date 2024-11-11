import { CodeBlock } from '../../code-block';
import { ContentLayout } from '../../layout';

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
    <ContentLayout.Wrapper title="Usage">
      <ContentLayout.Description>
        Render <span class="rounded bg-[#111] p-2 py-0.5 text-sm">{'<Toaster/>'}</span> in the root
        of your app.
      </ContentLayout.Description>
      <CodeBlock>{snipper}</CodeBlock>
    </ContentLayout.Wrapper>
  );
};
