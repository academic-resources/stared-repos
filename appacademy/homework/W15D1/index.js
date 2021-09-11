const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql')
const app = express()
const db = require('./config/keys').mongoURI

const User = require('./models/user')
const Post = require('./models/post')

const schema = require('./schema/schema')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err))

app.use(bodyParser.json())

app.use('/graphql', expressGraphQL({ schema, graphiql: true }))

app.get('/', (req, res) => res.send('Hello World Again'))

app.listen(5000, () => console.log('Server is running on port 5000'))
