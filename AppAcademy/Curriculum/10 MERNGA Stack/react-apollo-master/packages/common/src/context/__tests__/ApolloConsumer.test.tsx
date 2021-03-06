import React from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { render, cleanup } from "@testing-library/react";

import {
  ApolloProvider,
  ApolloConsumer,
  getApolloContext,
} from "@apollo/react-common";

const client = new ApolloClient({
  cache: new Cache(),
  link: new ApolloLink((o, f) => (f ? f(o) : null)),
});

describe("<ApolloConsumer /> component", () => {
  afterEach(cleanup);

  it("has a render prop", (done) => {
    render(
      <ApolloProvider client={client}>
        <ApolloConsumer>
          {(clientRender) => {
            try {
              expect(clientRender).toBe(client);
              done();
            } catch (e) {
              done.fail(e);
            }
            return null;
          }}
        </ApolloConsumer>
      </ApolloProvider>
    );
  });

  it("renders the content in the children prop", () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <ApolloConsumer>{() => <div>Test</div>}</ApolloConsumer>
      </ApolloProvider>
    );

    expect(getByText("Test")).toBeTruthy();
  });

  it("errors if there is no client in the context", () => {
    // Prevent Error about missing context type from appearing in the console.
    const errorLogger = console.error;
    console.error = () => {};
    expect(() => {
      // We're wrapping the `ApolloConsumer` component in a
      // `ApolloContext.Provider` component, to reset the context before
      // testing.
      const ApolloContext = getApolloContext();
      render(
        <ApolloContext.Provider value={{}}>
          <ApolloConsumer>{() => null}</ApolloConsumer>
        </ApolloContext.Provider>
      );
    }).toThrowError(
      'Could not find "client" in the context of ApolloConsumer. Wrap the root component in an <ApolloProvider>'
    );

    console.error = errorLogger;
  });
});
