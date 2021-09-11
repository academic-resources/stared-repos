import React from 'react';
import Profile from './Profile.js';
import TicketListH from './TicketListH.js';
import TicketListQ from './TicketListQ.js';

const MainH = props => {
    console.log("MainH = " + props.tickets);
    return (
        <div>
            <Profile />
            <TicketListH tickets={props.tickets}/>
            <TicketListQ tickets={props.tickets}/>
        </div>
    );
}
export default MainH;