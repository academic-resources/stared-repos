import React from 'react';
// import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import ContactForm from './ContactForm';
import Bubbles from './Bubbles';
import ColorList from './ColorList';

class BubblePage extends React.Component {
	state = {
		colorList: []
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		axiosWithAuth()
			.get('http://localhost:5000/api/colors')
			.then(res => {
				console.log(res.data);
				this.setState({
					colorList: res.data
				});
			})
			.catch(err => console.log(err));
	};
	setColorList = colorList => {
		this.setState({
			colorList: colorList
		});
	};

	render() {
		return (
			<>
				{this.props.fetchingData && (
					<div className="key spinner">
						<p>Loading Data</p>
					</div>
				)}
				<ContactForm />
				<ColorList
					colors={this.state.colorList}
					updateColors={colorList => {
						this.setState({ colorList: this.state.colorList });
					}}
				/>
				<Bubbles colors={this.state.colorList} />
			</>
		);
	}
}
export default BubblePage;
