import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ApolloClient from "apollo-boost";
import { HashRouter } from "react-router-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  // using the cache we just created
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const Root = () => {
  return (
    // set up the ApolloProvider tag with the Apollo client we set up earlier
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
