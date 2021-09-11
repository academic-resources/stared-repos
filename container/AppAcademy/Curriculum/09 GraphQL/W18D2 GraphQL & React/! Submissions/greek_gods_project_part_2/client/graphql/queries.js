import gql from 'graphql-tag'

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
      abode(id: $id) {
        id
        name
        coordinates
      }
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
    query FetchGod($id: ID!) {
      god(id: $id) {
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
        parents {
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
    }
  `,
  FETCH_PARENTS: gql`
    query FetchParents($id: ID) {
      god(id: $id) {
        parents {
          id
          name
        }
      }
    }
  `,
  FETCH_SIBLINGS: gql`
    query FetchSiblings($id: ID) {
      god(id: $id) {
        siblings {
          id
          name
        }
      }
    }
  `,
  FETCH_CHILDREN: gql`
    query FetchChildren($id: ID) {
      god(id: $id) {
        children {
          id
          name
        }
      }
    }
  `
}
