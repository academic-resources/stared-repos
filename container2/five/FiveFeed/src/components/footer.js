import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 1rem 0 1rem;
  max-width: 768px;
  padding: 0.75rem 0 1rem 0;
  color: #9CA2AB;
  border-top: 1px solid #32374C;

  @media (min-width: 768px) {
    & {
      margin: 0 auto;
    }
  }
`
const Span = styled.span`
  &:nth-child(1) {
    text-align: left;
  }

  &:nth-child(2) {
    text-align: right;
  }
`

export default () => (
  <Container>
    <Span>© Five <span role="img" aria-label="five">🖐</span> 2018</Span>
    <Span>
      <Link to="/about/">Meet the team! <span role="img" aria-label="bolt">⚡</span>️</Link>
    </Span>
  </Container>
)