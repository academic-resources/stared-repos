import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="card border center-flex">
      <p>
        Nothing to see here! <Link to="/">Go Back</Link>
      </p>
    </div>
  );
}

export default NoMatch;
