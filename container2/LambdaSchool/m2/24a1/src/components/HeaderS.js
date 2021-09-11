import React from "react";
import hideLogin from './Hide.js';
import hideSignup from './Hide.js';

// hide current page when login showing
hideLogin();
// hide current page when sign-up showing
hideSignup();

export default function Header() {
  return (
    <header className="ui centered">
      <h1 className="ui center">Your Tickets</h1>
    </header>
  );
}
