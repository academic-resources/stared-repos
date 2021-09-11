import React from 'react';
import Profile from './Profile.js';
import TicketListS from './TicketListS.js';

    function MainS(tickets) {
        console.log("MainS = " + tickets);
        return (
            <div>
                <Profile />
                <TicketListS tickets={tickets}/>
            </div>
        );
    }
export default MainS;