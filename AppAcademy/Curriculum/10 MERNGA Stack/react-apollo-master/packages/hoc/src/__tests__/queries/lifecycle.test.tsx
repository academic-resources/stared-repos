import React from "react";
import { render, cleanup } from "@testing-library/react";
import gql from "graphql-tag";
import ApolloClient from "apollo-client";
import { InMemoryCache as Cache } from "apollo-cache-inmemory";
import { mockSingleLink, stripSymbols } from "@apollo/react-testing";
import { ApolloProvider } from "@apollo/react-common";
import { DocumentNode } from "graphql";
import { Query as QueryComponent } from "@apollo/react-components";
import { graphql, ChildProps } from "@apollo/react-hoc";

describe("[queries] lifecycle", () => {
  afterEach(cleanup);

  // lifecycle
  it("reruns the query if it changes", (done) => {
    let count = 0;
    const query: DocumentNode = gql`
      query people($first: Int) {
        allPeople(first: $first) {
          people {
            name
          }
        }
      }
    `;

    const data1 = { allPeople: { people: [{ name: "Luke Skywalker" }] } };
    type Data = typeof data1;
    const variables1 = { first: 1 };
    type Vars = typeof variables1;

    const data2 = { allPeople: { people: [{ name: "Leia Skywalker" }] } };
    const variables2 = { first: 2 };

    const link = mockSingleLink(
      { request: { query, variables: variables1 }, result: { data: data1 } },
      { request: { query, variables: variables2 }, result: { data: data2 } }
    );

    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });

    const Container = graphql<Vars, Data, Vars>(query, {
      options: (props) => ({
        variables: props,
        fetchPolicy: count === 0 ? "cache-and-network" : "cache-first",
      }),
    })(
      class extends React.Component<ChildProps<Vars, Data, Vars>> {
        componentDidUpdate(prevProps: ChildProps<Vars, Data, Vars>) {
          const { data } = this.props;
          // loading is true, but data still there
          if (count === 1 && data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data1.allPeople);
          }
          if (count === 1 && !data!.loading && prevProps.data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data2.allPeople);
            done();
          }
        }
        render() {
          return null;
        }
      }
    );

    class ChangingProps extends React.Component<{}, { first: number }> {
      state = { first: 1 };

      componentDidMount() {
        setTimeout(() => {
          count++;
          this.setState({ first: 2 });
        }, 50);
      }

      render() {
        return <Container first={this.state.first} />;
      }
    }

    render(
      <ApolloProvider client={client}>
        <ChangingProps />
      </ApolloProvider>
    );
  });

  it("rebuilds the queries on prop change when using `options`", (done) => {
    const query: DocumentNode = gql`
      query people {
        allPeople(first: 1) {
          people {
            name
          }
        }
      }
    `;
    const data = { allPeople: { people: [{ name: "Luke Skywalker" }] } };
    type Data = typeof data;

    const link = mockSingleLink({
      request: { query },
      result: { data },
    });
    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });

    let firstRun = true;
    let isDone = false;
    function options(props: Props) {
      if (!firstRun) {
        expect(props.listId).toBe(2);
        if (!isDone) done();
        isDone = true;
      }
      return {};
    }
    interface Props {
      listId: number;
    }

    const Container = graphql<Props, Data>(query, { options })(() => null);

    class ChangingProps extends React.Component<{}, { listId: number }> {
      state = { listId: 1 };

      componentDidMount() {
        setTimeout(() => {
          firstRun = false;
          this.setState({ listId: 2 });
        }, 50);
      }

      render() {
        return <Container listId={this.state.listId} />;
      }
    }

    render(
      <ApolloProvider client={client}>
        <ChangingProps />
      </ApolloProvider>
    );
  });

  it("reruns the query if just the variables change", (done) => {
    let count = 0;
    const query: DocumentNode = gql`
      query people($first: Int) {
        allPeople(first: $first) {
          people {
            name
          }
        }
      }
    `;

    const data1 = { allPeople: { people: [{ name: "Luke Skywalker" }] } };
    type Data = typeof data1;

    const variables1 = { first: 1 };
    type Vars = typeof variables1;

    const data2 = { allPeople: { people: [{ name: "Leia Skywalker" }] } };
    const variables2 = { first: 2 };

    const link = mockSingleLink(
      { request: { query, variables: variables1 }, result: { data: data1 } },
      { request: { query, variables: variables2 }, result: { data: data2 } }
    );

    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });

    const Container = graphql<Vars, Data, Vars>(query, {
      options: (props) => ({ variables: props }),
    })(
      class extends React.Component<ChildProps<Vars, Data, Vars>> {
        componentDidUpdate(prevProps: ChildProps<Vars, Data, Vars>) {
          const { data } = this.props;
          // loading is true, but data still there
          if (count === 1 && data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data1.allPeople);
          }
          if (count === 1 && !data!.loading && prevProps.data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data2.allPeople);
            done();
          }
        }
        render() {
          return null;
        }
      }
    );

    class ChangingProps extends React.Component<any, { first: number }> {
      state = { first: 1 };

      componentDidMount() {
        setTimeout(() => {
          count++;
          this.setState({ first: 2 });
        }, 50);
      }

      render() {
        return <Container first={this.state.first} />;
      }
    }

    render(
      <ApolloProvider client={client}>
        <ChangingProps />
      </ApolloProvider>
    );
  });

  it("reruns the queries on prop change when using passed props", (done) => {
    let count = 0;
    const query: DocumentNode = gql`
      query people($first: Int) {
        allPeople(first: $first) {
          people {
            name
          }
        }
      }
    `;

    const data1 = { allPeople: { people: [{ name: "Luke Skywalker" }] } };
    type Data = typeof data1;

    const variables1 = { first: 1 };
    type Vars = typeof variables1;

    const data2 = { allPeople: { people: [{ name: "Leia Skywalker" }] } };
    const variables2 = { first: 2 };

    const link = mockSingleLink(
      { request: { query, variables: variables1 }, result: { data: data1 } },
      { request: { query, variables: variables2 }, result: { data: data2 } }
    );

    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });

    const Container = graphql<Vars, Data, Vars>(query)(
      class extends React.Component<ChildProps<Vars, Data, Vars>> {
        componentDidUpdate(prevProps: ChildProps<Vars, Data, Vars>) {
          const { data } = this.props;
          // loading is true, but data still there
          if (count === 1 && data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data1.allPeople);
          }
          if (count === 1 && !data!.loading && prevProps.data!.loading) {
            expect(stripSymbols(data!.allPeople)).toEqual(data2.allPeople);
            done();
          }
        }
        render() {
          return null;
        }
      }
    );

    class ChangingProps extends React.Component<any, { first: number }> {
      state = { first: 1 };

      componentDidMount() {
        setTimeout(() => {
          count++;
          this.setState({ first: 2 });
        }, 50);
      }

      render() {
        return <Container first={this.state.first} />;
      }
    }

    render(
      <ApolloProvider client={client}>
        <ChangingProps />
      </ApolloProvider>
    );
  });

  it("stays subscribed to updates after irrelevant prop changes", (done) => {
    const query: DocumentNode = gql`
      query people($first: Int) {
        allPeople(first: $first) {
          people {
            name
          }
        }
      }
    `;
    const variables = { first: 1 };
    type Vars = typeof variables;
    const data1 = { allPeople: { people: [{ name: "Luke Skywalker" }] } };
    type Data = typeof data1;

    const data2 = { allPeople: { people: [{ name: "Leia Skywalker" }] } };
    const link = mockSingleLink(
      { request: { query, variables }, result: { data: data1 } },
      { request: { query, variables }, result: { data: data2 } }
    );
    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });

    interface Props {
      foo: number;
      changeState: () => void;
    }

    let count = 0;
    const Container = graphql<Props, Data, Vars>(query, {
      options: { variables, notifyOnNetworkStatusChange: false },
    })(
      class extends React.Component<ChildProps<Props, Data, Vars>> {
        componentDidUpdate() {
          const { props } = this;
          count += 1;
          try {
            if (count === 1) {
              expect(props.foo).toEqual(42);
              expect(props.data!.loading).toEqual(false);
              expect(stripSymbols(props.data!.allPeople)).toEqual(
                data1.allPeople
              );
              props.changeState();
            } else if (count === 2) {
              expect(props.foo).toEqual(43);
              expect(props.data!.loading).toEqual(false);
              expect(stripSymbols(props.data!.allPeople)).toEqual(
                data1.allPeople
              );
              props.data!.refetch();
            } else if (count === 3) {
              expect(props.foo).toEqual(43);
              expect(props.data!.loading).toEqual(false);
              expect(stripSymbols(props.data!.allPeople)).toEqual(
                data2.allPeople
              );
              done();
            }
          } catch (e) {
            done.fail(e);
          }
        }
        render() {
          return null;
        }
      }
    );

    class Parent extends React.Component<any, any> {
      state = { foo: 42 };
      render() {
        return (
          <Container
            foo={this.state.foo}
            changeState={() => this.setState({ foo: 43 })}
          />
        );
      }
    }

    render(
      <ApolloProvider client={client}>
        <Parent />
      </ApolloProvider>
    );
  });

  it("correctly rebuilds props on remount", (done) => {
    const query: DocumentNode = gql`
      query pollingPeople {
        allPeople(first: 1) {
          people {
            name
          }
        }
      }
    `;
    const data = { allPeople: { people: [{ name: "Darth Skywalker" }] } };
    type Data = typeof data;
    const link = mockSingleLink({
      request: { query },
      result: { data },
      newData: () => ({
        data: {
          allPeople: {
            people: [{ name: `Darth Skywalker - ${Math.random()}` }],
          },
        },
      }),
    });
    const client = new ApolloClient({
      link,
      cache: new Cache({ addTypename: false }),
    });
    let app: React.ReactElement<any>,
      count = 0;

    const Container = graphql<{}, Data>(query, {
      options: { pollInterval: 10, notifyOnNetworkStatusChange: false },
    })(
      class extends React.Component<ChildProps<{}, Data>> {
        componentDidUpdate() {
          if (count === 1) {
            // has data
            render(app);
          }

          if (count === 10) {
            done();
          }
          count++;
        }
        render() {
          return null;
        }
      }
    );

    app = (
      <ApolloProvider client={client}>
        <Container />
      </ApolloProvider>
    );

    render(app);
  });

  it("will re-execute a query when the client changes", (done) => {
    const query: DocumentNode = gql`
      {
        a
        b
        c
      }
    `;
    const link1 = mockSingleLink(
      {
        request: { query },
        result: { data: { a: 1, b: 2, c: 3 } },
      },
      {
        request: { query },
        result: { data: { a: 1, b: 2, c: 3 } },
      }
    );
    const link2 = mockSingleLink(
      {
        request: { query },
        result: { data: { a: 4, b: 5, c: 6 } },
      },
      {
        request: { query },
        result: { data: { a: 4, b: 5, c: 6 } },
      }
    );
    const link3 = mockSingleLink({
      request: { query },
      result: { data: { a: 7, b: 8, c: 9 } },
    });
    const client1 = new ApolloClient({
      link: link1,
      cache: new Cache({ addTypename: false }),
    });
    const client2 = new ApolloClient({
      link: link2,
      cache: new Cache({ addTypename: false }),
    });
    const client3 = new ApolloClient({
      link: link3,
      cache: new Cache({ addTypename: false }),
    });

    interface Data {
      a: number;
      b: number;
      c: number;
    }
    let switchClient: (client: ApolloClient<any>) => void;
    let refetchQuery: () => void;
    let count = 0;

    const Query = graphql<{}, Data>(query, {
      options: { notifyOnNetworkStatusChange: true },
    })(
      class extends React.Component<ChildProps<{}, Data>> {
        componentDidMount() {
          refetchQuery = () => this.props.data!.refetch();
        }

        render() {
          const { loading, a, b, c } = this.props.data!;
          switch (count) {
            case 0:
              expect({ loading, a, b, c }).toEqual({
                loading: true,
                a: undefined,
                b: undefined,
                c: undefined,
              });
              break;
            case 1:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 1,
                b: 2,
                c: 3,
              });
              refetchQuery!();
              break;
            case 2:
              expect({ loading, a, b, c }).toEqual({
                loading: true,
                a: 1,
                b: 2,
                c: 3,
              });
              break;
            case 3:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 1,
                b: 2,
                c: 3,
              });
              setTimeout(() => {
                switchClient!(client2);
              });
              break;
            case 4:
              expect({ loading, a, b, c }).toEqual({
                loading: true,
                a: undefined,
                b: undefined,
                c: undefined,
              });
              break;
            case 5:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 4,
                b: 5,
                c: 6,
              });
              refetchQuery!();
              break;
            case 6:
              expect({ loading, a, b, c }).toEqual({
                loading: true,
                a: 4,
                b: 5,
                c: 6,
              });
              break;
            case 7:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 4,
                b: 5,
                c: 6,
              });
              setTimeout(() => {
                switchClient!(client3);
              });
              break;
            case 8:
              expect({ loading, a, b, c }).toEqual({
                loading: true,
                a: undefined,
                b: undefined,
                c: undefined,
              });
              break;
            case 9:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 7,
                b: 8,
                c: 9,
              });
              setTimeout(() => {
                switchClient!(client1);
              });
              break;
            case 10:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 1,
                b: 2,
                c: 3,
              });
              setTimeout(() => {
                switchClient!(client2);
              });
              break;
            case 11:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 4,
                b: 5,
                c: 6,
              });
              setTimeout(() => {
                switchClient!(client3);
              });
              break;
            case 12:
              expect({ loading, a, b, c }).toEqual({
                loading: false,
                a: 7,
                b: 8,
                c: 9,
              });
              done();
              break;
            default:
            // do nothing
          }
          count += 1;
          return null;
        }
      }
    );

    class ClientSwitcher extends React.Component<any, any> {
      state = {
        client: client1,
      };

      componentDidMount() {
        switchClient = (newClient) => {
          this.setState({ client: newClient });
        };
      }

      render() {
        return (
          <ApolloProvider client={this.state.client}>
            <Query />
          </ApolloProvider>
        );
      }
    }

    render(<ClientSwitcher />);
  });

  it("handles synchronous racecondition with prefilled data from the server", async (done) => {
    const query: DocumentNode = gql`
      query GetUser($first: Int) {
        user(first: $first) {
          name
        }
      }
    `;
    const variables = { first: 1 };
    type Vars = typeof variables;
    const data2 = { user: { name: "Luke Skywalker" } };
    type Data = typeof data2;

    const link = mockSingleLink({
      request: { query, variables },
      result: { data: data2 },
      delay: 10,
    });
    const initialState = {
      apollo: {
        data: {
          ROOT_QUERY: {
            'user({"first":1})': null,
          },
        },
      },
    };

    const client = new ApolloClient({
      link,
      // prefill the store (like SSR would)
      // @see https://github.com/zeit/next.js/blob/master/examples/with-apollo/lib/initApollo.js
      cache: new Cache({ addTypename: false }).restore(initialState),
    });

    let count = 0;
    const Container = graphql<Vars, Data>(query)(
      class extends React.Component<ChildProps<Vars, Data>> {
        componentDidMount() {
          this.props.data!.refetch().then((result) => {
            expect(result.data.user.name).toBe("Luke Skywalker");
            done();
          });
        }

        render() {
          count++;
          const user = this.props.data!.user;
          const name = user ? user.name : "";
          if (count === 2) {
            expect(name).toBe("Luke Skywalker");
          }
          return null;
        }
      }
    );

    render(
      <ApolloProvider client={client}>
        <Container first={1} />
      </ApolloProvider>
    );
  });

  it("handles asynchronous racecondition with prefilled data from the server", async (done) => {
    const query: DocumentNode = gql`
      query Q {
        books {
          name
          __typename
        }
      }
    `;

    const ssrResult = {
      books: [
        {
          name: "ssrfirst",
          __typename: "Book",
        },
      ],
    };

    const result = {
      books: [
        {
          name: "first",
          __typename: "Book",
        },
      ],
    };

    const ssrLink = mockSingleLink({
      request: { query } as any,
      result: { data: ssrResult },
    });

    const link = mockSingleLink({
      request: { query } as any,
      result: { data: result },
    });

    const ssrClient = new ApolloClient({
      cache: new Cache(),
      link: ssrLink,
    });
    await ssrClient.query({
      query,
      variables: {},
    });
    const client = new ApolloClient({
      cache: new Cache().restore(ssrClient.extract()), // --- this is the "SSR" bit
      link,
    });

    //try to render the app / call refetch / etc

    let refetched = false;
    const ApolloApp = (
      <ApolloProvider client={client}>
        <QueryComponent query={query}>
          {({ loading, data, error, refetch }: any) => {
            if (loading) {
              done.fail(
                "should not be loading, since already have data from ssr"
              );
              return <div>loading</div>;
            }
            if (error) {
              done.fail(error);
              return <div>error</div>;
            }

            try {
              if (!refetched) {
                expect(data.books[0].name).toEqual("ssrfirst");
                //setTimeout allows component to mount, which often happens
                //when waiting  ideally we should be able to call refetch
                //immediately However the subscription needs to start before
                //we update the data To get around this issue, we would need
                //to start the subscription before we render to the page. In
                //practice, this seems like an uncommon use case, since the
                //data you get is fresh, so one would wait for an interaction
                setTimeout(() => {
                  refetch()
                    .then((refetchResult: any) => {
                      expect(refetchResult.data.books[0].name).toEqual("first");
                      done();
                    })
                    .catch(done.fail);
                });
                refetched = true;
              } else {
                expect(data.books[0].name).toEqual("first");
              }
            } catch (e) {
              done.fail(e);
            }
            return <p> stub </p>;
          }}
        </QueryComponent>
      </ApolloProvider>
    );

    //render
    expect(render(ApolloApp).container).toMatchSnapshot();
  });
});
