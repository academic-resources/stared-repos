import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContextWrapper from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextWrapper>
      <App />
    </UserContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
