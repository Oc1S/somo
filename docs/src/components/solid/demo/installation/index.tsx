import { CodeBlock } from '../../code-block';
import { ContentBlock } from '../../content-block';

export const Installation = () => {
  const content = 'npm install somoto';
  return (
    <ContentBlock title="Installation">
      <CodeBlock>{content}</CodeBlock>
    </ContentBlock>
  );
};
