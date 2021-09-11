import React from 'react';
import { View, HeadingText, Text, Button, Card, Link, SmallText, Container } from '../../components/~reusables/atoms/atoms';
import { small_space } from '../../components/~reusables/variables/spacing';

function IntroView() {
  return (
    <View vCenter hCenter>
      <Link to='/about' style={{textDecoration:'none'}}>
        <Card column vCenter hCenter>
          <HeadingText marginBottom={small_space} marginTop="0" hCenter>"Writing Good Code is a UX Problem."</HeadingText>
          <Text hCenter noMargin>Hello! I’m Alex, a designer turned fullstack web developer.</Text>
        </Card>
      </Link>
      <SmallText>Tap to Find Out More</SmallText>

      <Container column hCenter>
        <SmallText noMargin>Skills</SmallText>
        <Link to='/skills'>
          <Button>↓</Button>
        </Link>
      </Container>
    </View>
  );
}

export default IntroView;