import React from 'react';
import styled from 'styled-components';
import { Link as L } from 'react-router-dom';
import { 
  small_space, 
  normal_space,
  medium_space,
  large_space 
} from '../variables/spacing';
import { 
  base_font_size, 
  small_font_size, 
  h1_font_size,
  h2_font_size,
  h3_font_size,
  h4_font_size 
} from '../variables/font-sizes';
import { 
  white,
  theme_dark,
  theme_primary,
  theme_secondary
} from '../variables/colors';


//====== Buttons ======//
export const Button = styled.button`
  padding: ${small_space};
  font-size: ${base_font_size};
  text-transform: uppercase;
  border: none;
  outline: none;
  margin-bottom: ${normal_space};
  border: 1px solid ${theme_secondary};
  color: ${theme_secondary};
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  
  &:active {
    opacity: .8;
  }

  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const ButtonPrimary = styled(Button)`
  background-color: ${theme_primary};
  color: ${theme_dark};
  border: unset;

  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const TextButton = styled(Button)`
  background-color: unset;
  box-shadow: unset;
  padding: ${normal_space};

  &:active {
    opacity: .8;
    box-shadow: unset;
  }
`;

export const TextButtonPrimary = styled(TextButton)`
  color: #3897f0;
`;

//====== Card ======//
export const Card = styled.div`
  display: flex;
  padding: ${medium_space} ${normal_space};
  border: 1px solid ${theme_secondary};
  border-radius: 2px;
  overflow: hidden;

  ${props => (props.row ? `flex-direction: row;` : null)}
  ${props => (props.column ? `flex-direction: column;` : null)}
  ${
    props => (
      props.vCenter && props.column 
      ? `justify-content: center;`
      : props.vCenter
        ? `align-items: center;`
      : null
    )
  }
  ${
    props => (
      props.hCenter && props.column
      ? `align-items: center;`
      : props.hCenter
        ? `justify-content: center;`
      : null
    )
  }
  ${props => (props.noPadding ? `padding: 0;` : null)}
  ${props => (props.padding && Array.isArray(props.padding) ? `padding: ${props.padding.join(' ')};` : null)}
  ${props => (props.padding && Array.isArray(props.padding) === false ? `padding: ${props.padding};` : null)}
  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.width ? `width: ${props.width};` : null)}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth};` : null)}
  ${props => (props.margin ? `margin: ${props.margin};` : null)}
`;

//====== Container ======//
export const Container = styled.div`
  display: flex;

  ${props => (props.vCenter ? `justify-content: center;` : null)}
  ${props => (props.column ? `flex-direction: column;` : null)}
  ${props => (props.hCenter ? `align-items: center;` : null)}
  ${props => (props.padding && Array.isArray(props.padding) ? `padding: ${props.padding.join(' ')};` : null)}
  ${props => (props.padding && Array.isArray(props.padding) === false ? `padding: ${props.padding};` : null)}
  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.width ? `width: ${props.width};` : null)}
  ${props => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
`;

//====== Section ======//
export const Section = styled.section`
  display: flex;
  margin-bottom: ${medium_space};

  ${props => (props.vCenter ? `justify-content: center;` : null)}
  ${props => (props.column ? `flex-direction: column;` : null)}
  ${props => (props.hCenter ? `align-items: center;` : null)}
  ${props => (props.padding && Array.isArray(props.padding) ? `padding: ${props.padding.join(' ')};` : null)}
  ${props => (props.padding && Array.isArray(props.padding) === false ? `padding: ${props.padding};` : null)}
  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.width ? `width: ${props.width};` : null)}
  ${props => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

//====== Inputs ======//
export const Input = styled.input`
  appearance: none;
  display: inline-block;
  padding: ${normal_space};
  margin-bottom: ${normal_space};
  font-size: ${base_font_size};
  font-weight: 600;
  border-bottom: 2px solid rgba(40, 51, 63, .4);
  background-color: unset;
  outline: none;
  transition: all 200ms ease-in-out;
    &::placeholder {
      color: rgba(40, 51,63, .4);
      opacity: 1;
    }

    &:focus, &:checked {
      border: 2px solid ${theme_secondary};
      box-shadow: 0 0 6px 0 rgba(19,82,221,0.37);
    }
`;

//====== Text ======//
export const Text = styled.p`
  font-size: ${base_font_size};
  line-height: 2.5rem;
  margin-bottom: ${small_space};

  ${props => (props.light ? `color: ${white};` : null)}
  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.underline ? `text-decoration: underline;` : null)}
  ${props => (props.color ? `color: ${props.color};` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const SmallText = styled(Text)`
  font-size: ${small_font_size};
  margin-bottom: ${normal_space};
  
  ${props => (props.light ? `color: ${white};` : null)}
  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.color ? `color: ${props.color};` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const HeroText = styled.h1`
  font-size: ${h1_font_size};
  margin-bottom: ${small_space};
  color: ${theme_primary};
  text-transform: uppercase;

  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const HeadingText = styled.h3`
  font-size: ${h3_font_size};
  margin-bottom: ${normal_space};
  margin-top: ${large_space};
  color: ${theme_primary};
  text-transform: uppercase;

  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
  ${props => (props.marginTop ? `margin-top: ${props.marginTop};` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const SubheadingText = styled.h4`
  font-size: ${h4_font_size};
  margin-bottom: ${normal_space};
  color: ${theme_secondary};
  text-transform: uppercase;

  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const H3 = styled.h3`
  font-size: ${h3_font_size};
  margin-bottom: ${normal_space};
  text-transform: uppercase;

  ${props => (props.light ? `color: ${white};` : null)}
  ${props => (props.bold ? `font-weight: bold;` : null)}
  ${props => (props.noMargin ? `margin: 0;` : null)}
  ${props => (props.color ? `color: ${props.color};` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.marginBottom ? `margin-bottom: ${props.marginBottom};` : null)}
`;

export const Link = styled(({ fullWidth, ...rest}) => <L {...rest}/>)`
  text-decoration: none;
  color: unset;
  display: inline-block;

  ${props => (props.fullWidth ? `width: 100%;` : null)}
`;

export const A = styled.a`
  color: ${theme_secondary};
  font-size: ${base_font_size};

  ${props => (props.noUnderline ? `text-decoration: none;` : null)}
  ${props => (props.hCenter ? `text-align: center;` : null)}
  ${props => (props.fullWidth ? `width: 100%;` : null)}
`;

export const APrimary = styled(A)`
  color: ${theme_primary};
`;

//====== View ======//
export const View = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${props => (props.vCenter ? `justify-content: center;` : null)}
  ${props => (props.hCenter ? `align-items: center;` : null)}
  ${props => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
  ${props => (props.padding ? `padding: ${props.padding};` : null)}
`;

//====== Img ======//
export const Img = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

//====== Figure + Figcaption ======//
export const Figure = styled.figure`
  padding: 3px;
  margin: 0;
  border: 1px solid ${theme_secondary};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: ${small_space};

  ${props => (props.width ? `width: ${props.width};` : null)}
  ${props => (props.height ? `height: ${props.height};` : null)}
  ${props => (props.fullWidth ? `width: 100%;` : null)}
  ${props => (props.noBorder ? `border: unset;` : null)}
`;

export const Figcaption = styled.figcaption`
  font-size: ${base_font_size};
  display: flex;

  
  ${props => (
    props.vCenter && props.column
      ? `justify-content: center;`
      : props.vCenter
        ? `align-items: center;`
        : null
  )}
  ${props => (
    props.hCenter && props.column
      ? `align-items: center;`
      : props.hCenter
        ? `justify-content: center;`
        : null
  )}
`;
