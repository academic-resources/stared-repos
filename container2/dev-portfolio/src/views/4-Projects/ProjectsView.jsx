import React from 'react';
import { Link } from 'react-router-dom';
import { View, HeadingText, Button, Figure, Img, Container, Figcaption, SubheadingText, Section } from '../../components/~reusables/atoms/atoms';
import { small_space } from '../../components/~reusables/variables/spacing';

function ProjectsView() {
  return (
    <View hCenter padding={small_space}>
      <HeadingText>Notable Projects</HeadingText>
      
      <Section fullWidth column hCenter>
        <SubheadingText>Launched Apps</SubheadingText>
        <Container>
          <Container width="50%" column>
            <Link to="/project/123">
              <Figure fullWidth>
                <Img src="https://picsum.photos/401/301?blur=10" />
              </Figure>
              <Figcaption hCenter>
                Hello
              </Figcaption>
            </Link>
          </Container>
          <Container width="50%" column>
            <Link to="/project/234">
              <Figure fullWidth>
                <Img src="https://picsum.photos/400/300?blur=10" />
              </Figure>
              <Figcaption hCenter>
                Hello
              </Figcaption>
            </Link>
          </Container>
        </Container>
      </Section>
      
      <Section fullWidth column hCenter>
        <SubheadingText>Dev Tools</SubheadingText>
        <Container>
          <Container width="50%" column>
            <Link to="/project/345">
              <Figure fullWidth>
                <Img src="https://picsum.photos/399/299?blur=10" />
              </Figure>
              <Figcaption hCenter>
                Hello
              </Figcaption>
            </Link>
          </Container>
          <Container width="50%" column>
            <Link to="/project/456">
              <Figure fullWidth>
                <Img src="https://picsum.photos/402/302?blur=10" />
              </Figure>
              <Figcaption hCenter>
                Hello
              </Figcaption>
            </Link>
          </Container>
        </Container>
      </Section>
      
      <Link to='/resume'>
        <Button>↓</Button>
      </Link>
    </View>
  )
}

export default ProjectsView;