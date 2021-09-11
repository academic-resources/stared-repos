import React from 'react';
import { 
  View, 
  Link, 
  ButtonPrimary, 
  HeadingText, 
  Img, 
  Figure, 
  Section, 
  Card, 
  Text, 
  SubheadingText,
  A,
  Button
} from '../../components/~reusables/atoms/atoms';

function ProjectInfoView(props) {
  const { id } = props.match.params;
  return (
    <View hCenter>
      <Section column hCenter>
        <HeadingText>Project {id}</HeadingText>
        <Figure>
          <Img src="https://picsum.photos/640/440?blur=10"/>
        </Figure>
        <Card fullWidth column>
          <Text><strong>Information:</strong> dkjhwoeowu</Text>
          <Text><strong>Problem:</strong> dkjhwoeowu</Text>
          <Text><strong>Task:</strong> dkjhwoeowu</Text>
          <Text><strong>Technologies:</strong> dkjhwoeowu</Text>
        </Card>
        <Link to={`${props.match.url}/sandbox`} fullWidth>
          <ButtonPrimary fullWidth>View Project</ButtonPrimary>
        </Link>
      </Section>

      <Section column hCenter>
        <SubheadingText>Premise</SubheadingText>
        <Text>Curabitur est justo, accumsan ut bibendum sit amet, semper at dui. Ut sit amet dolor dictum, semper est ut, suscipit nisl. Donec imperdiet auctor nisi, eget finibus ante tincidunt vel. Aenean non commodo odio.</Text>
      </Section>
      <Section column hCenter>
        <SubheadingText>Architecture</SubheadingText>
        <Text>Curabitur est justo, accumsan ut bibendum sit amet, semper at dui. Ut sit amet dolor dictum, semper est ut, suscipit nisl. Donec imperdiet auctor nisi, eget finibus ante tincidunt vel. Aenean non commodo odio.</Text>
      </Section>
      <Section column hCenter>
        <SubheadingText>Tech Stack</SubheadingText>
        <Text>Curabitur est justo, accumsan ut bibendum sit amet, semper at dui. Ut sit amet dolor dictum, semper est ut, suscipit nisl. Donec imperdiet auctor nisi, eget finibus ante tincidunt vel. Aenean non commodo odio.</Text>
      </Section>
      <Section column hCenter>
        <SubheadingText>Biggest Challenges</SubheadingText>
        <Text>Curabitur est justo, accumsan ut bibendum sit amet, semper at dui. Ut sit amet dolor dictum, semper est ut, suscipit nisl. Donec imperdiet auctor nisi, eget finibus ante tincidunt vel. Aenean non commodo odio.</Text>
      </Section>
      <A to="" href="https://medium.com/@AlexEntrepreneur" target="_blank" fullWidth>
        <Button fullWidth>Read More On Medium...</Button>
      </A>
    </View>
  )
}

export default ProjectInfoView;