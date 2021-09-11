import gql from 'graphql-tag';

export default {
  FETCH_GODS: gql`
    query FetchGods {
      gods {
        id
        name
        description
      }
    }
  `,
  FETCH_ABODE: gql`
    query FetchAbode($id: ID) {
      id
      name
      coordinates
    }
  `,
  FETCH_ABODES: gql`
    query FetchAbodes {
      abodes {
        id
        name
      }
    }
  `,
  FETCH_EMBLEMS: gql`
    query FetchEmblems {
      emblems {
        id
        name
      }
    }
  `,
  FETCH_GOD: gql`
    query FetchGod($id: ID) {
      id
      name
      type
      description
      domains
      abode {
        id
        name
      }
      emblems {
        id
        name
      }
      parent {
        id
        name
      }
      children {
        id
        name
      }
      siblings {
        id
        name
      }
    }
  `,
  FETCH_PARENTS: gql`
    query FetchParents($id: ID) {
      parents {
        id
        name
      }
    }
  `,
  FETCH_SIBLINGS: gql`
    query FetchSiblings($id: ID) {
      siblings {
        id
        name
      }
    }
  `,
  FETCH_CHILDREN: gql`
    query FetchChildren($id: ID) {
      children {
        id
        name
      }
    }
  `
};
