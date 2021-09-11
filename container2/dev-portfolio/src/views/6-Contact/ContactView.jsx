import React from 'react';
import styled from 'styled-components';
import { View, HeadingText, Text, Container, Button, APrimary, A, Section, Link, SmallText } from '../../components/~reusables/atoms/atoms';
import { small_space, normal_space, large_space } from '../../components/~reusables/variables/spacing';
import { theme_primary } from '../../components/~reusables/variables/colors';
import { h3_font_size } from '../../components/~reusables/variables/font-sizes';

function ContactView() {
  return (
    <View hCenter>
      <Section column hCenter>
        <HeadingText>Contact</HeadingText>
        <Text marginBottom={normal_space}>Pellentesque habitant morbi tristique senectus.</Text>
        <APrimary href="mailto:hi@email.com">
          <EmailText noMargin>hi@email.com</EmailText>
        </APrimary>
      </Section>
      

      <Container>
        <A href="https://github.com/AlexEntrepreneur" target="_blank" noUnderline>
          <Container column hCenter>
            <Button marginBottom={small_space}>Icon</Button>
            <Text underline>GitHub</Text>
          </Container>
        </A>
        <A href="https://twitter.com/AlexEntrprnr" target="_blank" noUnderline>
          <Container column hCenter>
            <Button marginBottom={small_space}>Icon</Button>
            <Text underline>Twitter</Text>
          </Container>
        </A>
        <A href="https://linkedin.com/" target="_blank" noUnderline>
          <Container column hCenter>
            <Button marginBottom={small_space}>Icon</Button>
            <Text underline>LinkedIn</Text>
          </Container>
        </A>
      </Container>

      <Container column hCenter>
        <SmallText noMargin>Home</SmallText>
        <Link to='/'>
          <Button>↓</Button>
        </Link>
      </Container>
    </View>
  )
}

const EmailText = styled(Text)`
  font-size: ${h3_font_size};
  color: ${theme_primary};
`;

export default ContactView;