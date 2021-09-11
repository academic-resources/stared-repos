import React, { useState, useEffect } from "react";
import hideLogin, { hideSignup } from "./Hide";
import TicketH from './TicketH.js';
import styled from 'styled-components';

const H1 = styled.h1`
    color: #383651;
    font-size: 2.5rem;
    margin-left: 3%;
    text-align: center;
    width: 100%;
    justify-content: center;
    text-align: center;
`
const Form = styled.form`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 5%;
`
const Center = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 0;
    border-top: 2px solid #383651;
    border-bottom: 2px solid #383651;
    padding-bottom: 10%;
`
const Div1 = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const fieldLength = {
    "color": "#383651",
    "font-size": "1.5rem",
    "width": "100%",
    "margin": "2%",
    "padding": "0"
}
const SearchDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
`

// hide current page when login showing
hideLogin();
// hide current page when sign-up showing
hideSignup();

    // // TODO:  make each list headline clickable to expand height
const SearchFormH = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultsH, setSearchResultsH] = useState([]);


  useEffect(() => {
    if (props.ticketsH !== null) {
      const results = props.ticketsH.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.category.toLowerCase().includes(searchTerm.toLowerCase())  ||
        ticket.date.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      console.log("useEffect Search Results = " + results);
      setSearchResultsH([...results]);
    }
  }, [searchTerm, props.ticketsH]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  console.log("profile id = " + props.profile.id);

  function expandList() {
    let listToExpand = document.getElementById("searchFormH");
    console.log("ticketListH height = " + listToExpand.style.height);
    let currentDisplay = listToExpand.style.display;
    console.log(currentDisplay);
    let expandDivText = document.getElementById("expandListTextH");
      if (currentDisplay !== "none") {
        listToExpand.style.display = "none";
        listToExpand.style.height = "0%";
        expandDivText.textContent = "click header to show your assigned tickets"
      }
      else {
        listToExpand.style.display = "flex";
        listToExpand.style.height = "100%";
        expandDivText.textContent = "click header to hide your assigned tickets"
      }
    

  }

  if (props.ticketsH === null) { 
    return (null);
  }
  else {  
  return (
    <Center>  
      <Div1>
        <div id="expandListTextH" style={{ color: '#86929d', fontSize: '0.75rem', fontStyle: 'italic' }}>click header to show your assigned tickets</div>
        <H1 onClick={expandList} >Your Assigned Tickets:  </H1>
        <Form id="searchFormH" style={{display: 'none', height: '0%'}}>
          <SearchDiv>
            <input
              id="name"
              type="text"
              name="textfield"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
              style={fieldLength}
            />
          </SearchDiv>
          {
            searchResultsH.map(
              ticket => (
                  <TicketH key={ticket.id} ticket={ticket} />
              )
            )
          }
        </Form>
      </Div1>
    </Center>
    
    );
        }
}

export default SearchFormH;