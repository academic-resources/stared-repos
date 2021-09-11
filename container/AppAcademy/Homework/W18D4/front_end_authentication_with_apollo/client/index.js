import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./components/App";

// set up our Cache for Apollo
const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});

// set up our client instance with the cache and a uri to know where data
// will be coming from
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
  headers: {
    // pass our token into the header of each request
    authorization: localStorage.getItem("auth-token")
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem("auth-token"))
  }
});

// Setup our Apollo Provider so that our entire application
// will have access to the Apollo and the cache
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
