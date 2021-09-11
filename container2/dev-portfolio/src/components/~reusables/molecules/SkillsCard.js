import styled from 'styled-components';
import { Card } from '../atoms/atoms';
import { small_space, normal_space, medium_space } from '../variables/spacing';

export const SkillsCard = styled(Card)`
  position: relative;
  margin-bottom: ${normal_space};
  overflow: visible;
  padding: ${small_space};

  & .title {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    padding: 0 ${normal_space};
    max-width: 90%;
    background: white;
  }
`;