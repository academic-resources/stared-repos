import React from 'react';
import styled from 'styled-components';

//MUI
import { Link, Typography } from '@material-ui/core';

const Root = styled.div`
  display: flex;
  justify-content: space-between;

`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Footer = () => {
  return (
    <Root>
      <Left>
        <Typography style={{ color: '#AFB1D4' }}>Made By <Link style={{ color: 'rgb(198 179 179)' }} href="https://github.com/ahan8927">Aaron Hanson</Link> Built with <Link style={{ color: 'rgb(198 179 179)' }} href="https://tonejs.github.io/" >Tone.js</Link></Typography>
        <Typography style={{ color: '#AFB1D4' }}>Project <Link style={{ color: 'rgb(198 179 179)' }} href='https://github.com/ahan8927/Muse'>Repo</Link></Typography>
      </Left>
      <Right>
        <Typography style={{ color: '#AFB1D4' }}>Inspired by <Link style={{ color: 'rgb(198 179 179)' }} href='https://github.com/joebeachjoebeach/beat-bucket'>this Man</Link> and <Link style={{ color: 'rgb(198 179 179)' }} href='http://sampulator.com/'>this Man</Link></Typography>
        <Typography style={{ color: '#AFB1D4' }}><Link style={{ color: 'rgb(198 179 179)' }} href="https://github.com/ahan8927">Github</Link> <Link style={{ color: 'rgb(198 179 179)' }} href='https://www.linkedin.com/in/aaron-hanson-brb/'>LinkedIn</Link> <Link style={{ color: 'rgb(198 179 179)' }}>Portfolio</Link></Typography>
      </Right>
    </Root>
    // <>
    // </>
  )
}

export default Footer
