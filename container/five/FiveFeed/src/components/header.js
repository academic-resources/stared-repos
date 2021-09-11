import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LoginButton from './login'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 26px;
  margin: 0 1rem 0 1rem;
  max-width: 768px;
  padding: 0.75rem 0 1rem 0;
  border-bottom: 1px solid #32374C;

  @media (min-width: 768px) {
    & {
      margin: 0 auto;
    }
  }
`
const Title = styled.h1`
  grid-column-start: 1;
  margin: 0;
  text-align: left;
  font-size: 1.5rem;
`
const StyledLink = styled(Link)`
  color: #addb67;
`

const Header = ({ siteTitle }) => (
  <Container>
    <Title>
      <StyledLink to="/">
        {siteTitle}
      </StyledLink>
    </Title>
    <LoginButton />
  </Container>
)

Header.propTypes = { siteTitle: PropTypes.string.isRequired }

export default Header
