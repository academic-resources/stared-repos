import React from "react";
import hideLogin, { hideSignup } from "./Hide";
import styled from 'styled-components';

const Div = styled.div`
  	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
  	font-weight: bold;
  	padding: 1em;
	margin: 1%;
  	text-align: center;
	justify-content: center;
`

const AppName = styled.h1`
	display: flex;
  	color: #383651;
  	text-align: center;
	justify-content: center;
	font-size: 3.5rem;
	font-weight: bold;
`
	
// hide current page when login showing
hideLogin();
// hide current page when sign-up showing
hideSignup();
export default function Header() {
  return (
	  	<Div>
      		<AppName >Queued Tickets:</AppName >
	  	</Div>
  );
}
