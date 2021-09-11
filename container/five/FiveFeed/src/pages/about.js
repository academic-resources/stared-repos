import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'


const Title = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  h1 {
    font-size: 1.5rem;
  }
`

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: auto;

  @media (min-width: 768px) {
    & {
      grid-template-columns: repeat(6, 1fr);
    }
  }
`

const ImageWrapper = styled.div`
  display: flex
  flex-direction: column;
  align-items: center;
  padding: 5px;
  div {
    margin-top: 20px;
    color: #9CA2AB;
  }
`

const Img = styled.img`
  border-radius: 50%;
`

const Form = styled.form`
  max-width: 420px;
  margin: 50px auto;
`

const Input = styled.input`
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border: 2px solid #ADDB67;
  color: #9CA2AB;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
`

const Textarea = styled.textarea`
  height: 150px;
  line-height: 150%;
  resize: vertical;
  width: 100%;
  background-color: transparent;
  border: 2px solid #ADDB67;
  color: #9CA2AB;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 13px;
`

const Submit = styled.button`
  width: 100%;
  background: #ADDB67;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  margin-top: -4px;
  font-weight: 700;
  &:hover {
    background: #CC6666;
  }
`
export default () => (
  <Layout>
    <Title>
      <h1>Meet the team</h1>
    </Title>
    <Images>
      <ImageWrapper>
        <Img src="https://avatars0.githubusercontent.com/u/2607929?s=400&v=4" />
        <div>
          <a href="http://github.com/frankfaustino">Frank</a>
        </div>
      </ImageWrapper>
      <ImageWrapper>
        <Img src="https://avatars1.githubusercontent.com/u/1832557?s=400&v=4" />
        <div>
          <a href="http://github.com/1kohei1">Kohei</a>
        </div>
      </ImageWrapper>
      <ImageWrapper>
        <Img src="https://avatars0.githubusercontent.com/u/28818476?s=400&v=4" />
        <div>
          <a href="http://github.com/jkasem">Justin</a>
        </div>
      </ImageWrapper>
      <ImageWrapper>
        <Img src="https://avatars1.githubusercontent.com/u/6034810?s=400&v=4" />
        <div>
          <a href="http://github.com/spacexengineer">Hunter</a>
        </div>
      </ImageWrapper>
      <ImageWrapper>
        <Img src="https://pbs.twimg.com/profile_images/793136164379193344/uBl63U29_400x400.jpg" />
        <div>
          <a href="http://github.com/nesfandiari">Niki</a>
        </div>
      </ImageWrapper>
      <ImageWrapper>
        <Img src="https://avatars1.githubusercontent.com/u/26584764?s=400&v=4" />
        <div>
          <a href="http://github.com/sumi419">Sumayyah</a>
        </div>
      </ImageWrapper>
    </Images>
    <div style={{ textAlign: 'center' }}>
      <Form
        action="https://formspree.io/hunter.casbeer@gmail.com"
        method="POST"
      >
        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="_replyto" placeholder="Your email" />
        <Textarea name="message" placeholder="Send us feedback!" />
        <Submit type="submit">Submit</Submit>
      </Form>
    </div>
  </Layout>
)
