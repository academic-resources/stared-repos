import React from 'react';
import { Link } from 'react-router-dom';
import hideLogin from './Hide.js';
import hideSignup from './Hide.js';
import SearchForm from './SearchForm.js';
import Ticket from './Ticket.js';
import HeaderS from './HeaderS.js';

const TicketListS = props => {    

  // hide current page when login showing
  hideLogin();
  // hide current page when sign-up showing
  hideSignup();
  
  return (
    <section className="search-form">
      <HeaderS />
      <SearchForm tickets={props.tickets} searchResults={props.searchResults} setSearchResults={props.setSearchResults}/>
      <div className="character-list">
        <ul>
          {
            props.searchResults.map(
              ticket => (
                <Link to="/ticket"><Ticket key={ticket.id} ticket={ticket} /></Link>
              )
            )
          }
        </ul>
      </div>
    </section>
    
  );
}

export default TicketListS;