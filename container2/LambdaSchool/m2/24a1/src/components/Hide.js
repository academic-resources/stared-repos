
import axios from 'axios';

function hideLogin() {
    // hide current page when login showing
    if (window.location.pathname === '/login') return null;
  }
  function hideSignup(){
    // hide current page when sign-up showing
    if (window.location.pathname === '/signup') return null;
}


function loadForm(props){
    let url = `http://localhost:5000/tickets?submitid=${props.currentUserID}`;
    axios
        .get(url)
        .then(res => {
            console.log("form response = "); 
            console.log(res.data.data);
            console.log("form userinfo = " + res.data.userinfo);
            console.log("form tickets = " + res.data.tickets);
            console.log("form contacts = " + res.data.contacts);
            props.setTickets(res.data);
            props.setSearchResults(res.data);




    })
    .catch(err => {
        console.log(err);
    });  
    
}

export { hideSignup };
export { loadForm };
export default hideLogin;