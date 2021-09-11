import React, { useState } from 'react';
import { selectMustang, selectBatmobile, selectWeinermobile } from '../actions';
import { connect } from 'react-redux';

import Header from './Header';
import AddedFeatures from './AddedFeatures';
import AdditionalFeatures from './AdditionalFeatures';
import Total from './Total';

const MainPage = props => {
	return (
		<div className="boxes">
			<div className="box">
				<Header />
				<AddedFeatures />
			</div>
			<div className="box">
				<AdditionalFeatures />
				<Total />
			</div>
		</div>
	);
};
export default MainPage;
