import React from 'react';
import styled from 'styled-components';

const URL = styled.a`
	color: #a5acaf;
	:link {
		color: #a5acaf;
	}
`;
var aStyle = {
	color: '#a5acaf'
};

var container = {
	width: '70%',
	textAlign: 'center',
	margin: '15%'
};
const DisplayAPI = props => {
	return (
		<div>
			<h2>{props.title}</h2>
			<img src={props.hdurl} width="50%" />
			<div style={container}>
				<h3>{props.date}</h3>
				<h3>
					<URL href={props.hdurl} target="_blank">
						HD URL
					</URL>
				</h3>

				<div>
					<p>{props.explanation}</p>
				</div>
			</div>
		</div>
	);
};

export default DisplayAPI;
