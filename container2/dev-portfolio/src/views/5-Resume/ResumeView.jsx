import React from 'react';
import { Link } from 'react-router-dom';
import { View, ButtonPrimary, Button, HeadingText, Figure, Img, Figcaption, Container } from '../../components/~reusables/atoms/atoms';

function ResumeView() {
  return (
    <View hCenter>
      <HeadingText>Resumé</HeadingText>
      <Container column>
        <Figure>
          <Img src="https://picsum.photos/320/430?blur=10" />
        </Figure>
        <Figcaption>
          <ButtonPrimary fullWidth>Download</ButtonPrimary>
        </Figcaption>
      </Container>
      <Link to='/contact'>
        <Button>↓</Button>
      </Link>
    </View>
  )
}

export default ResumeView;