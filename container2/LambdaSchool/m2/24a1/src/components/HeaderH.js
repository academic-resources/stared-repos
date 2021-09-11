import React from "react";
import hideLogin, { hideSignup } from "./Hide";

// hide current page when login showing
hideLogin();
// hide current page when sign-up showing
hideSignup();

export default function Header() {
  return (
    <header className="ui centered">
      <h1 className="ui center">Your Assigned Tickets</h1>
    </header>
  );
}
