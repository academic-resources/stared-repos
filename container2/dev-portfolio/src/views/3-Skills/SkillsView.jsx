import React from 'react';
import { Link } from 'react-router-dom';
import { View, Container, HeadingText, Text, Button } from '../../components/~reusables/atoms/atoms';
import { SkillsCard } from '../../components/~reusables/molecules/SkillsCard';
import { small_space } from '../../components/~reusables/variables/spacing';

function SkillsView() {
  return (
    <View hCenter padding={small_space}>
      <HeadingText>Skills Stack</HeadingText>
      <Container fullWidth column>
        <SkillsCard hCenter>
          <Text noMargin>UX</Text>
        </SkillsCard>
        <SkillsCard hCenter>
          <Text noMargin className="title">UI Design</Text>
          ...
        </SkillsCard>
        <Container>
          <SkillsCard fullWidth hCenter>
            <Text noMargin className="title">Frontend Web</Text>
            ...
          </SkillsCard>
          <SkillsCard hCenter width="50%">
            <Text noMargin className="title">Tooling</Text>
            ...
          </SkillsCard>
        </Container>
        <Container>
          <SkillsCard fullWidth hCenter>
            <Text noMargin className="title">Backend</Text>
            ...
          </SkillsCard>
          <SkillsCard hCenter width="50%">
            <Text noMargin className="title">Tooling</Text>
            ...
          </SkillsCard>
        </Container>
        <SkillsCard hCenter>
          <Text noMargin className="title">Data Storage</Text>
          ...
        </SkillsCard>
        <SkillsCard hCenter>
          <Text noMargin className="title">Computer Science</Text>
          ...
        </SkillsCard>
      </Container>
      <Link to='/projects'>
        <Button>↓</Button>
      </Link>
    </View>
  )
}

export default SkillsView;