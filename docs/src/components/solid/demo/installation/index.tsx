import { CodeBlock } from '../../code-block';
import { ContentLayout } from '../../layout';

export const Installation = () => {
  const content = 'npm install somoto';
  return (
    <ContentLayout.Wrapper title="Installation">
      <CodeBlock>{content}</CodeBlock>
    </ContentLayout.Wrapper>
  );
};
