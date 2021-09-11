import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';

const SWLinks = styled.a`
	color: white;
	font-weight: bold;
`;
const BioData = styled.div`
	display: flex;
	color: #69e4ea;
	font-weight: bold;
	-webkit-font-stroke: 2px black;
	background-color: black;
	flex-wrap: nowrap;
`;
const SWH1 = styled.h1`
	text-align: center;
`;
const CustomData = styled.span`
	display: flex;
	flex-wrap: nowrap;
	color: #eaea69;
	font-weight: bold;
	background-color: black;
`;
const PaginationBtn = styled.div`
	color: red;
	font-weight: bold;
	background-color: black;
`;
const App = () => {
	// Try to think through what state you'll need for this app before starting. Then build out
	// the state properties here.

	// Fetch characters from the star wars api in an effect hook. Remember, anytime you have a
	// side effect in a component, you want to think about which state and/or props it should
	// sync up with, if any.

	// styled components

	// buttons for next/previous

	// variables to hold state
	// name height mass hair color skin color eye color birth year gender homeworld url
	// films species vehicles starships
	/*
      const [charName, setName] = useState("");
      const [birthYear, setBirthYear] = useState("");
      const [gender, setGender] = useState("");
      const [homeworld, setHomeworld] = useState("");
    
      const [films, setFilms] = useState("");
      const [starships, setStarships] = useState("");
    */
	const [previousLink, setPreviousLink] = useState('');
	const [nextLink, setNextLink] = useState('');
	const [characters, setCharacters] = useState([{}]);
	const [pArray, setPArray] = useState([]);

	useEffect(() => {
		axios
			.get('https://swapi.co/api/people/')
			.then(response => {
				console.log(response);
				console.log('------------------------');
				console.log('RESPONSE DATA' + response.data);
				console.log('------------------------');
				console.log('RESPONSE DATA RESULTS' + response.data.results);
				console.log('------------------------');
				setCharacters(response.data.results);
				setPreviousLink(response.data.previous);
				setNextLink(response.data.next);
				console.log('nextLink = ' + response.data.next);
				// setPArray([previousLink, nextLink]);
				// need loop to loop thru each page, 10 results per page results 0-9
			})
			.catch(error => {
				console.log(error);
			});

		function previousPg(previousLink) {
			if (previousLink) {
				axios
					.get(previousLink)
					.then(response => {
						setCharacters(response.data.results);
						if (response.data.previous) {
							setPreviousLink(response.data.previous);
						}
						if (response.data.next) {
							setNextLink(response.data.next);
						}
						console.log(response.data.next);
					})
					.catch(error => {
						console.log(error);
					});
			}
		}

		function nextPg(nextLink) {
			if (nextLink) {
				axios
					.get(nextLink)
					.then(response => {
						setCharacters(response.data.results);
						setPreviousLink(response.data.previous);
						setNextLink(response.data.next);
						console.log(response.data.next);
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}, []);

	const PreviousButton = () => {
		{
			if (previousLink != null) {
				pArray.map(function (item) {
					return (
						<PaginationBtn>
							<div class="button">
								<a href={previousLink}>Previous Page</a>
							</div>
						</PaginationBtn>
					);
				});
			} else {
				return null;
			}
		}
	};

	const NextButton = () => {
		if (nextLink != null) {
			{
				pArray.map(function (item) {
					return (
						<PaginationBtn>
							<div class="button">
								<a href={nextLink}>Next Page</a>
							</div>
						</PaginationBtn>
					);
				});
			}
		} else {
			return null;
		}
	};

	return (
		<div>
			<SWH1>React Wars</SWH1>
			<PaginationBtn>
				<div class="button">
					<a href={previousLink}>Previous Page</a>
				</div>
			</PaginationBtn>
			<PaginationBtn>
				<div class="button">
					<a href={nextLink}>Next Page</a>
				</div>
			</PaginationBtn>
			{characters.map(function (item) {
				console.log(item);
				return (
					<div key={item}>
						<div>
							<p>
								<BioData>Name: </BioData>
								<CustomData>{item.name}</CustomData>
							</p>
							<p>
								<BioData>Birth Year: </BioData>
								<CustomData>{item.birth_year}</CustomData>
							</p>
							<p>
								<BioData>Gender: </BioData>
								<CustomData>{item.gender}</CustomData>
							</p>
							<p>
								<SWLinks href={item.homeworld} target="_blank">
									Homeworld URL
								</SWLinks>
							</p>
							<p>
								<SWLinks href={item.films} target="_blank">
									Films URL
								</SWLinks>
							</p>
							<p>
								<SWLinks href={item.starships} target="_blank">
									Starships URL
								</SWLinks>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default App;
