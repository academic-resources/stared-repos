import React from "react";
import styled from 'styled-components';

	
const Div = styled.div`
  	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
  	border-bottom: 2px solid #383651;
  	font-weight: bold;
  	padding: 1em;
	max-width: 96%;
	margin: 1%;
`

const AppName = styled.h1`
	display: flex;
  	color: #383651;
  	text-align: right;
	justify-content: right;
	font-size: 3.5rem;
	font-weight: bold;
	margin-left: 6%;  
	max-width: 27%;
`

const Img = styled.img`
	max-width: 65%;
	margin: 0;
	padding: 0;
`

export default function Header() {
  	return (
	  	<Div>
		  	<Img src={`${process.env.PUBLIC_URL}/img/lambda-logo.png`}/>
		  	<AppName >DevDesk</AppName>
    	</Div>
  	);
}
