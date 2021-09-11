import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Item from './item'

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`

const FiveList = ({ recs }) => (
  <Container>
    {recs.map(({ link, title, type }) => (
      <Item key={title} type={type} url={link}>
        {title}
      </Item>
    ))}
  </Container>
)

FiveList.propTypes = { recs: PropTypes.array.isRequired }

export default FiveList
