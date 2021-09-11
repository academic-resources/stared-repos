import React from 'react';
import { View, HeadingText, Img, Figure, Text, SmallText, Section, SubheadingText, Container, Link, Button } from '../../components/~reusables/atoms/atoms';

function AboutView() {
  return (
    <View hCenter>
      <HeadingText>About</HeadingText>
      <Section column>
        <Figure fullWidth>
          <Img src="https://picsum.photos/640/200?blur=10" />
        </Figure>
        <Text>Maecenas volutpat, justo ac imperdiet lobortis, arcu augue congue nibh, et eleifend tellus ex eu lacus. Curabitur est justo, accumsan ut bibendum sit amet, semper at dui. Maecenas volutpat, justo ac imperdiet lobortis, arcu augue congue nibh, et eleifend tellus ex eu lacus.</Text>
      </Section>
      <Section column>
        <SubheadingText>5 Facts About Me</SubheadingText>
        <Container column>
          <Figure noBorder>
            <Img src="https://picsum.photos/80/80?blur=10" />
          </Figure>
          <Text>1. Some fact about me.</Text>
        </Container>
        <Container column>
          <Figure noBorder>
            <Img src="https://picsum.photos/81/81?blur=10" />
          </Figure>
          <Text>2. Some fact about me.</Text>
        </Container>
        <Container column>
          <Figure noBorder>
            <Img src="https://picsum.photos/79/79?blur=10" />
          </Figure>
          <Text>3. Some fact about me.</Text>
        </Container>
        <Container column>
          <Figure noBorder>
            <Img src="https://picsum.photos/80/80?blur=10" />
          </Figure>
          <Text>4. Some fact about me.</Text>
        </Container>
        <Container column>
          <Figure noBorder>
            <Img src="https://picsum.photos/81/81?blur=10" />
          </Figure>
          <Text>5. Some fact about me.</Text>
        </Container>

        <Container column hCenter>
          <SmallText noMargin>Skills</SmallText>
          <Link to='/skills'>
            <Button>↓</Button>
          </Link>
        </Container>
      </Section>
    </View>
  );
}

export default AboutView;