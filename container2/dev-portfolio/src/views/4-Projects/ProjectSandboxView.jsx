import React from 'react';
import styled from 'styled-components';
import { View, Button, Card, Link } from '../../components/~reusables/atoms/atoms';

function ProjectSandboxView(props) {
  return (
    <View hCenter>
      <ProjectFrame>
        <iframe src="https://tipseaseapp.netlify.com/"></iframe>
      </ProjectFrame>
      <Link to={`${props.match.url}/code`} fullWidth>
        <Button fullWidth>View Project Code</Button>
      </Link>
    </View>
  )
}

const ProjectFrame = styled(Card)`
  width: 100%;
  height: 100vh;
  padding: 3px;
  border-radius: unset;

  & iframe {
    width: 100%;
    height: 100%;
    border: unset;
  }
`;

export default ProjectSandboxView;