import styled from 'styled-components';
import { small_space, normal_space } from '../variables/spacing';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${small_space};
  }
  
  & > *:last-child {
    margin-top: ${small_space};
    margin-bottom: ${normal_space};
  }
`;