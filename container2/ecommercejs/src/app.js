const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const graphqlConfig = require('./frameworks/graphql')

const app = express();

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP(graphqlConfig))

module.exports = { app }
