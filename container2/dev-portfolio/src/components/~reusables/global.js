import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    ${props => (props.boxSizing ? `box-sizing: ${props.boxSizing};` : null) };
  }

  html {
    font-size: 62.5%;
  }
`