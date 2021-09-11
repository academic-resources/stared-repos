import React from "react";

const FooterNav = () => {
  return (
    <div className="foot-nav">
      <div className="foot-nav-elements">
        <span className="external-links">
          <a href="https://github.com/BCrawfordScott/aeterNote">Github</a>
          <a href="https://www.linkedin.com/in/brian-crawford-scott-27379b89/">
            LinkedIn
          </a>
          <a href="mailto:BrianCrawfordScott@gmail.com">Email</a>
        </span>
        <span className="quotes">
          <p className="fake-quote">IN ÆTERNUM CONFIDUNT IN ELEFANTI.</p>
          <p className="translation">-Forever trust in the elephant.</p>
        </span>
      </div>
    </div>
  );
};

export default FooterNav;
