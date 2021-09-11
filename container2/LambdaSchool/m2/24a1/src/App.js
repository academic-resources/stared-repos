import React from 'react';
import Header from './components/Header.js';
import { Route } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import MainLoad from './components/MainLoad.js';
import TicketListH from './components/TicketListH.js';
import TicketListS from './components/TicketListS.js';
import TicketListQ from './components/TicketListQ.js';
import SearchForm from './components/SearchForm.js';
import SearchFormQ from './components/SearchFormQ.js';

export default function App() {
	return (
		<main>
			<div>
				<Header />
				<Route path="/" component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/main" component={MainLoad} />
				<Route path="/profile" component={Profile} />
				<Route path="/ticketlisth" component={TicketListH} />
				<Route path="/ticketlists" component={TicketListS} />
				<Route path="/ticketlistq" component={TicketListQ} />
				<Route path="/searchform" component={SearchForm} />
				<Route path="/searchformq" component={SearchFormQ} />
			</div>
		</main>
	);
}
