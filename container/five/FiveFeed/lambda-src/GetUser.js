require('dotenv').config({ path: '.env.development' })
const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNA_KEY,
})

exports.handler = async function (event, context, callback) {
  // const data = await client.query(
  //   q.Get(q.Ref(q.Class('user'), '215067775483249154'))
  // )
  const data = 'hey'
  console.log(data)
  let response = {
    statusCode,
    headers,
    body: JSON.stringify(data),
  }
  callback(null, response)
}
