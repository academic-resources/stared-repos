import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const App = ({ data }) => <Fragment>{ data.hi }</Fragment>

const hiQuery = gql`{ hi }`

export default graphql(hiQuery)(App)