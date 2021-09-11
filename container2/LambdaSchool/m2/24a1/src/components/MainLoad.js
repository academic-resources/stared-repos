import React from 'react';
import Profile from './Profile.js';
import TicketListH from './TicketListH.js';
import SearchFormQ from './SearchFormQ.js';
import SearchFormH from './SearchFormH.js';
import SearchForm from './SearchForm.js';
import NewTicket from './NewTicket.js';


const MainLoad = props => { 
    console.log("Mainload props.searchResults = " + props.searchResults);
    console.log("Mainload props.tickets = " + props.tickets);
    console.log("Mainload props.ticketsH = " + props.ticketsH);
    console.log("Mainload props.ticketsQ = " + props.ticketsQ);
    if (props.currentUsertype === "helper") {
        if (props.searchResultsH === null) { 
              return (
                  <div>
                    <Profile profile={props.profile} />
                    <NewTicket profile={props.profile} currentUserID={props.currentUserID} setTickets={props.setTickets} setSearchResults={props.setSearchResults}/>
                    <TicketListH ticketsH={props.searchResultsH} searchResultsH={props.searchResultsH} setSearchResultsH={props.setSearchResultsH}/>
                    <SearchFormQ ticketsQ={props.ticketsQ} searchResultsQ={props.searchResultsQ} setSearchResultsQ={props.setSearchResultsQ} profile={props.profile} />
            </div>
            );
        }
        else {
            return (
                <div>                    
                    <Profile profile={props.profile} />
                    <NewTicket profile={props.profile} currentUserID={props.currentUserID} setTickets={props.setTickets} setSearchResults={props.setSearchResults}/>
                    <SearchForm tickets={props.tickets} searchResults={props.searchResults} setSearchResults={props.setSearchResults} profile={props.profile} />
                    <SearchFormH ticketsH={props.ticketsH} searchResultsH={props.searchResultsH} setSearchResultsH={props.setSearchResultsH} profile={props.profile} />
                    <SearchFormQ ticketsQ={props.ticketsQ} searchResultsQ={props.searchResultsQ} setSearchResultsQ={props.setSearchResultsQ} profile={props.profile} />
                </div>
            );
        }
    }
    else {
        return (
            <div>
                <Profile profile={props.profile}/>
                <NewTicket profile={props.profile} currentUserID={props.currentUserID} setTickets={props.setTickets} setSearchResults={props.setSearchResults}/>
                <SearchForm tickets={props.tickets} searchResults={props.searchResults} setSearchResults={props.setSearchResults} profile={props.profile} />
            </div>
        );
    }

}

export default MainLoad;