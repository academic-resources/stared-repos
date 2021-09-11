import React from 'react';
import styled from 'styled-components';
import { View, Container } from '../../components/~reusables/atoms/atoms';

function ProjectSandboxCodeView() {
  return (
    <View hCenter>
      <CodeSandboxFrame>
        <iframe src="https://codesandbox.io/embed/ry6p8j7qq4?codemirror=1&runonclick=0&view=editor&hidenavigation=1"></iframe>
      </CodeSandboxFrame>
    </View>
  )
}

const CodeSandboxFrame = styled(Container)`
  width: 100%;
  height: 100vh;

  & iframe {
    width: 100%;
    height: 100%;
    border: unset;
  }
`;

export default ProjectSandboxCodeView;