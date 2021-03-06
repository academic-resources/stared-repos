import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-components";

import App from "./App";

const client = new ApolloClient({
  uri: "https://ojo6385vn6.sse.codesandbox.io",
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <App episode="EMPIRE" />
  </ApolloProvider>
);

render(WrappedApp, document.getElementById("root"));
