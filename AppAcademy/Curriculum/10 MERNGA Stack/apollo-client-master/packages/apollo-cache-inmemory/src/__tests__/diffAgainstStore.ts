import gql, { disableFragmentWarnings } from "graphql-tag";
import { toIdValue } from "apollo-utilities";

import { defaultNormalizedCacheFactory } from "../objectCache";
import { StoreReader } from "../readFromStore";
import { StoreWriter } from "../writeToStore";
import { HeuristicFragmentMatcher } from "../fragmentMatcher";
import { defaultDataIdFromObject } from "../inMemoryCache";
import { NormalizedCache } from "../types";

const fragmentMatcherFunction = new HeuristicFragmentMatcher().match;

disableFragmentWarnings();
export function withError(func: Function, regex: RegExp) {
  let message: string = null as never;
  const { error } = console;
  console.error = (m: any) => {
    message = m;
  };

  try {
    const result = func();
    expect(message).toMatch(regex);
    return result;
  } finally {
    console.error = error;
  }
}

describe("diffing queries against the store", () => {
  const reader = new StoreReader();
  const writer = new StoreWriter();

  it(
    "expects named fragments to return complete as true when diffd against " +
      "the store",
    () => {
      const store = defaultNormalizedCacheFactory({});

      const queryResult = reader.diffQueryAgainstStore({
        store,
        query: gql`
          query foo {
            ...root
          }

          fragment root on Query {
            nestedObj {
              innerArray {
                id
                someField
              }
            }
          }
        `,
        fragmentMatcherFunction,
        config: {
          dataIdFromObject: defaultDataIdFromObject,
        },
      });

      expect(queryResult.complete).toEqual(false);
    }
  );

  it(
    "expects inline fragments to return complete as true when diffd against " +
      "the store",
    () => {
      const store = defaultNormalizedCacheFactory();

      const queryResult = reader.diffQueryAgainstStore({
        store,
        query: gql`
          {
            ... on DummyQuery {
              nestedObj {
                innerArray {
                  id
                  otherField
                }
              }
            }
            ... on Query {
              nestedObj {
                innerArray {
                  id
                  someField
                }
              }
            }
            ... on DummyQuery2 {
              nestedObj {
                innerArray {
                  id
                  otherField2
                }
              }
            }
          }
        `,
        fragmentMatcherFunction,
        config: {
          dataIdFromObject: defaultDataIdFromObject,
        },
      });

      expect(queryResult.complete).toEqual(false);
    }
  );

  it("returns nothing when the store is enough", () => {
    const query = gql`
      {
        people_one(id: "1") {
          name
        }
      }
    `;

    const result = {
      people_one: {
        name: "Luke Skywalker",
      },
    };

    const store = writer.writeQueryToStore({
      result,
      query,
    });

    expect(
      reader.diffQueryAgainstStore({
        store,
        query,
      }).complete
    ).toBeTruthy();
  });

  it("caches root queries both under the ID of the node and the query name", () => {
    const firstQuery = gql`
      {
        people_one(id: "1") {
          __typename
          id
          name
        }
      }
    `;

    const result = {
      people_one: {
        __typename: "Person",
        id: "1",
        name: "Luke Skywalker",
      },
    };

    const getIdField = ({ id }: { id: string }) => id;

    const store = writer.writeQueryToStore({
      result,
      query: firstQuery,
      dataIdFromObject: getIdField,
    });

    const secondQuery = gql`
      {
        people_one(id: "1") {
          __typename
          id
          name
        }
      }
    `;

    const { complete } = reader.diffQueryAgainstStore({
      store,
      query: secondQuery,
    });

    expect(complete).toBeTruthy();
    expect(store.get("1")).toEqual(result.people_one);
  });

  it("does not swallow errors other than field errors", () => {
    const firstQuery = gql`
      query {
        person {
          powers
        }
      }
    `;
    const firstResult = {
      person: {
        powers: "the force",
      },
    };
    const store = writer.writeQueryToStore({
      result: firstResult,
      query: firstQuery,
    });
    const unionQuery = gql`
      query {
        ...notARealFragment
      }
    `;
    return expect(() => {
      reader.diffQueryAgainstStore({
        store,
        query: unionQuery,
      });
    }).toThrowError(/No fragment/);
  });

  it("does not error on a correct query with union typed fragments", () => {
    return withError(() => {
      const firstQuery = gql`
        query {
          person {
            __typename
            firstName
            lastName
          }
        }
      `;
      const firstResult = {
        person: {
          __typename: "Author",
          firstName: "John",
          lastName: "Smith",
        },
      };
      const store = writer.writeQueryToStore({
        result: firstResult,
        query: firstQuery,
      });
      const unionQuery = gql`
        query {
          person {
            __typename
            ... on Author {
              firstName
              lastName
            }
            ... on Jedi {
              powers
            }
          }
        }
      `;
      const { complete } = reader.diffQueryAgainstStore({
        store,
        query: unionQuery,
        returnPartialData: false,
        fragmentMatcherFunction,
      });

      expect(complete).toBe(false);
    }, /IntrospectionFragmentMatcher/);
  });

  it("does not error on a query with fields missing from all but one named fragment", () => {
    const firstQuery = gql`
      query {
        person {
          __typename
          firstName
          lastName
        }
      }
    `;
    const firstResult = {
      person: {
        __typename: "Author",
        firstName: "John",
        lastName: "Smith",
      },
    };
    const store = writer.writeQueryToStore({
      result: firstResult,
      query: firstQuery,
    });
    const unionQuery = gql`
      query {
        person {
          __typename
          ...authorInfo
          ...jediInfo
        }
      }

      fragment authorInfo on Author {
        firstName
      }

      fragment jediInfo on Jedi {
        powers
      }
    `;

    const { complete } = reader.diffQueryAgainstStore({
      store,
      query: unionQuery,
    });

    expect(complete).toBe(false);
  });

  it("throws an error on a query with fields missing from matching named fragments", () => {
    const firstQuery = gql`
      query {
        person {
          __typename
          firstName
          lastName
        }
      }
    `;
    const firstResult = {
      person: {
        __typename: "Author",
        firstName: "John",
        lastName: "Smith",
      },
    };
    const store = writer.writeQueryToStore({
      result: firstResult,
      query: firstQuery,
    });
    const unionQuery = gql`
      query {
        person {
          __typename
          ...authorInfo2
          ...jediInfo2
        }
      }

      fragment authorInfo2 on Author {
        firstName
        address
      }

      fragment jediInfo2 on Jedi {
        jedi
      }
    `;
    expect(() => {
      reader.diffQueryAgainstStore({
        store,
        query: unionQuery,
        returnPartialData: false,
      });
    }).toThrow();
  });

  it("returns available fields if returnPartialData is true", () => {
    const firstQuery = gql`
      {
        people_one(id: "1") {
          __typename
          id
          name
        }
      }
    `;

    const firstResult = {
      people_one: {
        __typename: "Person",
        id: "lukeId",
        name: "Luke Skywalker",
      },
    };

    const store = writer.writeQueryToStore({
      result: firstResult,
      query: firstQuery,
    });

    // Variants on a simple query with a missing field.

    const simpleQuery = gql`
      {
        people_one(id: "1") {
          name
          age
        }
      }
    `;

    const inlineFragmentQuery = gql`
      {
        people_one(id: "1") {
          ... on Person {
            name
            age
          }
        }
      }
    `;

    const namedFragmentQuery = gql`
      query {
        people_one(id: "1") {
          ...personInfo
        }
      }

      fragment personInfo on Person {
        name
        age
      }
    `;

    const simpleDiff = reader.diffQueryAgainstStore({
      store,
      query: simpleQuery,
    });

    expect(simpleDiff.result).toEqual({
      people_one: {
        name: "Luke Skywalker",
      },
    });

    const inlineDiff = reader.diffQueryAgainstStore({
      store,
      query: inlineFragmentQuery,
    });

    expect(inlineDiff.result).toEqual({
      people_one: {
        name: "Luke Skywalker",
      },
    });

    const namedDiff = reader.diffQueryAgainstStore({
      store,
      query: namedFragmentQuery,
    });

    expect(namedDiff.result).toEqual({
      people_one: {
        name: "Luke Skywalker",
      },
    });

    expect(function () {
      reader.diffQueryAgainstStore({
        store,
        query: simpleQuery,
        returnPartialData: false,
      });
    }).toThrow();
  });

  it("will add a private id property", () => {
    const query = gql`
      query {
        a {
          id
          b
        }
        c {
          d
          e {
            id
            f
          }
          g {
            h
          }
        }
      }
    `;

    const queryResult = {
      a: [
        { id: "a:1", b: 1.1 },
        { id: "a:2", b: 1.2 },
        { id: "a:3", b: 1.3 },
      ],
      c: {
        d: 2,
        e: [
          { id: "e:1", f: 3.1 },
          { id: "e:2", f: 3.2 },
          { id: "e:3", f: 3.3 },
          { id: "e:4", f: 3.4 },
          { id: "e:5", f: 3.5 },
        ],
        g: { h: 4 },
      },
    };

    function dataIdFromObject({ id }: { id: string }) {
      return id;
    }

    const store = writer.writeQueryToStore({
      query,
      result: queryResult,
      dataIdFromObject,
    });

    const { result } = reader.diffQueryAgainstStore({
      store,
      query,
    });

    expect(result).toEqual(queryResult);
    expect(dataIdFromObject(result.a[0])).toBe("a:1");
    expect(dataIdFromObject(result.a[1])).toBe("a:2");
    expect(dataIdFromObject(result.a[2])).toBe("a:3");
    expect(dataIdFromObject(result.c.e[0])).toBe("e:1");
    expect(dataIdFromObject(result.c.e[1])).toBe("e:2");
    expect(dataIdFromObject(result.c.e[2])).toBe("e:3");
    expect(dataIdFromObject(result.c.e[3])).toBe("e:4");
    expect(dataIdFromObject(result.c.e[4])).toBe("e:5");
  });

  describe("referential equality preservation", () => {
    it("will return the previous result if there are no changes", () => {
      const query = gql`
        query {
          a {
            b
          }
          c {
            d
            e {
              f
            }
          }
        }
      `;

      const queryResult = {
        a: { b: 1 },
        c: { d: 2, e: { f: 3 } },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: { b: 1 },
        c: { d: 2, e: { f: 3 } },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).toEqual(previousResult);
    });

    it("will return parts of the previous result that changed", () => {
      const query = gql`
        query {
          a {
            b
          }
          c {
            d
            e {
              f
            }
          }
        }
      `;

      const queryResult = {
        a: { b: 1 },
        c: { d: 2, e: { f: 3 } },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: { b: 1 },
        c: { d: 20, e: { f: 3 } },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).not.toEqual(previousResult);
      expect(result.a).toEqual(previousResult.a);
      expect(result.c).not.toEqual(previousResult.c);
      expect(result.c.e).toEqual(previousResult.c.e);
    });

    it("will return the previous result if there are no changes in child arrays", () => {
      const query = gql`
        query {
          a {
            b
          }
          c {
            d
            e {
              f
            }
          }
        }
      `;

      const queryResult = {
        a: [{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }],
        c: {
          d: 2,
          e: [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }, { f: 3.4 }, { f: 3.5 }],
        },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: [{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }],
        c: {
          d: 2,
          e: [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }, { f: 3.4 }, { f: 3.5 }],
        },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).toEqual(previousResult);
    });

    it("will not add zombie items when previousResult starts with the same items", () => {
      const query = gql`
        query {
          a {
            b
          }
        }
      `;

      const queryResult = {
        a: [{ b: 1.1 }, { b: 1.2 }],
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: [{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }],
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result.a[0]).toEqual(previousResult.a[0]);
      expect(result.a[1]).toEqual(previousResult.a[1]);
    });

    it("will return the previous result if there are no changes in nested child arrays", () => {
      const query = gql`
        query {
          a {
            b
          }
          c {
            d
            e {
              f
            }
          }
        }
      `;

      const queryResult = {
        a: [[[[[{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }]]]]],
        c: {
          d: 2,
          e: [
            [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }],
            [{ f: 3.4 }, { f: 3.5 }],
          ],
        },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: [[[[[{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }]]]]],
        c: {
          d: 2,
          e: [
            [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }],
            [{ f: 3.4 }, { f: 3.5 }],
          ],
        },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).toEqual(previousResult);
    });

    it("will return parts of the previous result if there are changes in child arrays", () => {
      const query = gql`
        query {
          a {
            b
          }
          c {
            d
            e {
              f
            }
          }
        }
      `;

      const queryResult = {
        a: [{ b: 1.1 }, { b: 1.2 }, { b: 1.3 }],
        c: {
          d: 2,
          e: [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }, { f: 3.4 }, { f: 3.5 }],
        },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: [{ b: 1.1 }, { b: -1.2 }, { b: 1.3 }],
        c: {
          d: 20,
          e: [{ f: 3.1 }, { f: 3.2 }, { f: 3.3 }, { f: 3.4 }, { f: 3.5 }],
        },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).not.toEqual(previousResult);
      expect(result.a).not.toEqual(previousResult.a);
      expect(result.a[0]).toEqual(previousResult.a[0]);
      expect(result.a[1]).not.toEqual(previousResult.a[1]);
      expect(result.a[2]).toEqual(previousResult.a[2]);
      expect(result.c).not.toEqual(previousResult.c);
      expect(result.c.e).toEqual(previousResult.c.e);
      expect(result.c.e[0]).toEqual(previousResult.c.e[0]);
      expect(result.c.e[1]).toEqual(previousResult.c.e[1]);
      expect(result.c.e[2]).toEqual(previousResult.c.e[2]);
      expect(result.c.e[3]).toEqual(previousResult.c.e[3]);
      expect(result.c.e[4]).toEqual(previousResult.c.e[4]);
    });

    it("will return the same items in a different order with `dataIdFromObject`", () => {
      const query = gql`
        query {
          a {
            id
            b
          }
          c {
            d
            e {
              id
              f
            }
            g {
              h
            }
          }
        }
      `;

      const queryResult = {
        a: [
          { id: "a:1", b: 1.1 },
          { id: "a:2", b: 1.2 },
          { id: "a:3", b: 1.3 },
        ],
        c: {
          d: 2,
          e: [
            { id: "e:1", f: 3.1 },
            { id: "e:2", f: 3.2 },
            { id: "e:3", f: 3.3 },
            { id: "e:4", f: 3.4 },
            { id: "e:5", f: 3.5 },
          ],
          g: { h: 4 },
        },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
        dataIdFromObject: ({ id }: { id: string }) => id,
      });

      const previousResult = {
        a: [
          { id: "a:3", b: 1.3 },
          { id: "a:2", b: 1.2 },
          { id: "a:1", b: 1.1 },
        ],
        c: {
          d: 2,
          e: [
            { id: "e:4", f: 3.4 },
            { id: "e:2", f: 3.2 },
            { id: "e:5", f: 3.5 },
            { id: "e:3", f: 3.3 },
            { id: "e:1", f: 3.1 },
          ],
          g: { h: 4 },
        },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).not.toEqual(previousResult);
      expect(result.a).not.toEqual(previousResult.a);
      expect(result.a[0]).toEqual(previousResult.a[2]);
      expect(result.a[1]).toEqual(previousResult.a[1]);
      expect(result.a[2]).toEqual(previousResult.a[0]);
      expect(result.c).not.toEqual(previousResult.c);
      expect(result.c.e).not.toEqual(previousResult.c.e);
      expect(result.c.e[0]).toEqual(previousResult.c.e[4]);
      expect(result.c.e[1]).toEqual(previousResult.c.e[1]);
      expect(result.c.e[2]).toEqual(previousResult.c.e[3]);
      expect(result.c.e[3]).toEqual(previousResult.c.e[0]);
      expect(result.c.e[4]).toEqual(previousResult.c.e[2]);
      expect(result.c.g).toEqual(previousResult.c.g);
    });

    it("will return the same JSON scalar field object", () => {
      const query = gql`
        {
          a {
            b
            c
          }
          d {
            e
            f
          }
        }
      `;

      const queryResult = {
        a: { b: 1, c: { x: 2, y: 3, z: 4 } },
        d: { e: 5, f: { x: 6, y: 7, z: 8 } },
      };

      const store = writer.writeQueryToStore({
        query,
        result: queryResult,
      });

      const previousResult = {
        a: { b: 1, c: { x: 2, y: 3, z: 4 } },
        d: { e: 50, f: { x: 6, y: 7, z: 8 } },
      };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query,
        previousResult,
      });

      expect(result).toEqual(queryResult);
      expect(result).not.toEqual(previousResult);
      expect(result.a).toEqual(previousResult.a);
      expect(result.d).not.toEqual(previousResult.d);
      expect(result.d.f).toEqual(previousResult.d.f);
    });
    it("will preserve equality with custom resolvers", () => {
      const listQuery = gql`
        {
          people {
            id
            name
            __typename
          }
        }
      `;

      const listResult = {
        people: [
          {
            id: "4",
            name: "Luke Skywalker",
            __typename: "Person",
          },
        ],
      };

      const itemQuery = gql`
        {
          person(id: 4) {
            id
            name
            __typename
          }
        }
      `;

      const dataIdFromObject = (obj: any) => obj.id;

      const store = writer.writeQueryToStore({
        query: listQuery,
        result: listResult,
        dataIdFromObject,
      });

      const previousResult = {
        person: listResult.people[0],
      };

      const cacheRedirects = {
        Query: {
          person: (_: any, args: any) =>
            toIdValue({ id: args["id"], typename: "Person" }),
        },
      };

      const config = { dataIdFromObject, cacheRedirects };

      const { result } = reader.diffQueryAgainstStore({
        store,
        query: itemQuery,
        previousResult,
        config,
      });

      expect(result).toEqual(previousResult);
    });
  });

  describe("malformed queries", () => {
    it("throws for non-scalar query fields without selection sets", () => {
      // Issue #4025, fixed by PR #4038.

      const validQuery = gql`
        query getMessageList {
          messageList {
            id
            __typename
            message
          }
        }
      `;

      const invalidQuery = gql`
        query getMessageList {
          # This field needs a selection set because its value is an array
          # of non-scalar objects.
          messageList
        }
      `;

      const store = writer.writeQueryToStore({
        query: validQuery,
        result: {
          messageList: [
            {
              id: 1,
              __typename: "Message",
              message: "hi",
            },
            {
              id: 2,
              __typename: "Message",
              message: "hello",
            },
            {
              id: 3,
              __typename: "Message",
              message: "hey",
            },
          ],
        },
      });

      try {
        reader.diffQueryAgainstStore({
          store,
          query: invalidQuery,
        });
        throw new Error("should have thrown");
      } catch (e) {
        expect(e.message).toEqual(
          "Missing selection set for object of type Message returned for query field messageList"
        );
      }
    });
  });

  describe("issue #4081", () => {
    it("should not return results containing cycles", () => {
      const company = {
        __typename: "Company",
        id: 1,
        name: "Apollo",
        users: [],
      } as any;

      company.users.push(
        {
          __typename: "User",
          id: 1,
          name: "Ben",
          company,
        },
        {
          __typename: "User",
          id: 2,
          name: "James",
          company,
        }
      );

      const query = gql`
        query Query {
          user {
            ...UserFragment
            company {
              users {
                ...UserFragment
              }
            }
          }
        }

        fragment UserFragment on User {
          id
          name
          company {
            id
            name
          }
        }
      `;

      function check(store: NormalizedCache) {
        const { result } = reader.diffQueryAgainstStore({ store, query });

        // This JSON.stringify call has the side benefit of verifying that the
        // result does not have any cycles.
        const json = JSON.stringify(result);

        company.users.forEach((user: any) => {
          expect(json).toContain(JSON.stringify(user.name));
        });

        expect(result).toEqual({
          user: {
            id: 1,
            name: "Ben",
            company: {
              id: 1,
              name: "Apollo",
              users: [
                {
                  id: 1,
                  name: "Ben",
                  company: {
                    id: 1,
                    name: "Apollo",
                  },
                },
                {
                  id: 2,
                  name: "James",
                  company: {
                    id: 1,
                    name: "Apollo",
                  },
                },
              ],
            },
          },
        });
      }

      // Check first using generated IDs.
      check(
        writer.writeQueryToStore({
          query,
          result: {
            user: company.users[0],
          },
        })
      );

      // Now check with __typename-specific IDs.
      check(
        writer.writeQueryToStore({
          dataIdFromObject: defaultDataIdFromObject,
          query,
          result: {
            user: company.users[0],
          },
        })
      );
    });
  });
});
