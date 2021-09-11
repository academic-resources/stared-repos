import React from 'react';
import hideLogin from './Hide.js';
import hideSignup from './Hide.js';
import SearchForm from './SearchForm.js';
import TicketH from './TicketH.js';
import HeaderH from './HeaderH.js';

const TicketListS = props => {
 
  // hide current page when login showing
  hideLogin();
  // hide current page when sign-up showing
  hideSignup();
  
  function expandListT() {
    let listToExpand = document.getElementById("ticketListH");
    console.log("ticketListH height = " + listToExpand.style.height);
    let currentDisplay = listToExpand.style.display;
    console.log(currentDisplay);
    let expandDivText = document.getElementById("expandListText");
    if (currentDisplay !== "none") {
      listToExpand.style.display = "none";
      listToExpand.style.height = "0%";
      expandDivText.textContent = "(click header to show your assigned tickets)"
    }
    else {
      listToExpand.style.display = "flex";
      listToExpand.style.height = "100%";
      expandDivText.textContent = "(click header to hide your assigned tickets)"
    }

  }
  return (
    <section className="search-form">
      <SearchForm tickets={props.tickets} searchResults={props.searchResults} setSearchResults={props.setSearchResults}/>
      <div id="expandListText">(click header to show your assigned tickets)</div>
      <HeaderH onClick={expandListT} />
      <div className="character-list" id="ticketListH">
          {
            props.searchResults.map(
              ticket => (
                <TicketH key={ticket.id} ticket={ticket} />
              )
            )
          }
      </div>
    </section>
    
  );
}

export default TicketListS;