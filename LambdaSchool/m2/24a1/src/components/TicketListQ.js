import React from 'react';
import hideLogin from './Hide.js';
import hideSignup from './Hide.js';
import TicketQ from './Ticket.js';
import HeaderQ from './HeaderQ.js';

const TicketListQ = props => {

  
  // hide current page when login showing
  hideLogin();
  // hide current page when sign-up showing
  hideSignup();
  
  return (
    <section className="search-form">
      <HeaderQ />
      <div className="character-list">
        {
            props.ticketsQ.map(
              ticket => (
                <TicketQ key={ticket.id} ticket={ticket} profile={props.profile}/>
              )
            )
          }
      </div>
    </section>
    
  );
}


export default TicketListQ;