import React from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

import DisplayAPI from './DisplayAPI';
import ContactForm from './ContactForm';

class FriendsList extends React.Component {
	state = {
		FriendsList: [
			{
				name: 'Joe',
				age: 24,
				email: 'joe@lambdaschool.com'
			},
			{
				name: 'Erica',
				age: 38,
				email: 'evoingram@aquoco.onmicrosoft.com'
			}
		]
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		axiosWithAuth()
			.get('http://localhost:5000/api/friends')
			.then(res => {
				console.log(res.data);
				this.setState({
					FriendsList: res.data
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="gas-prices">
				{this.props.fetchingData && (
					<div className="key spinner">
						<p>Loading Data</p>
					</div>
				)}
				{console.log('FriendsList.js Friends Response = ' + this.state.FriendsList)}
				<ContactForm />
				{this.state.FriendsList.map(friend => (
					<DisplayAPI
						key={friend.id}
						name={friend.name}
						age={friend.age}
						email={friend.email}
						id={friend.id}
					/>
				))}
			</div>
		);
	}
}

export default FriendsList;
