// require('dotenv').config({ path: '.env.development' })
// const statusCode = 200
// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }
// const faunadb = require('faunadb')
// const q = faunadb.query

// exports.handler = async function(event, context, callback) {
//   let data = JSON.parse(event.body)
//   data = JSON.parse(data.body)
//   const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_KEY })
//   client
//     .query(
//       q.Create(q.Class('curator'), {
//         data: {
//           name: data.name,
//           profilePic: data.profilePic,
//           recs: [],
//         },
//       })
//     )
//     .then(res => {
//       console.log(res)
//       let response = {
//         statusCode,
//         headers,
//         body: 'Success',
//       }
//       callback(null, response)
//     })
//     .catch(res => {
//       console.log(res)
//       let response = {
//         statusCode,
//         headers,
//         body: 'failure',
//       }
//       callback(null, response)
//     })
// }
