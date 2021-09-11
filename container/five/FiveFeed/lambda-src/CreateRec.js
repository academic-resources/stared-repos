// require('dotenv').config({ path: '.env.development' })
// const statusCode = 200
// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }
// const faunadb = require('faunadb')
// const q = faunadb.query

// exports.handler = async function (event, context, callback) {
//   let data = JSON.parse(event.body)
//   data = JSON.parse(data.body)
//   const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_KEY })
//   client
//     .query(
//       q.Update(q.Class('rec'), {
//         data: { recs: data.recs },
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
//         statusCode=407,
//         headers,
//         body: 'failure',
//       }
//       callback(null, response)
//     })
// }

// client.query(
//   q.CreateFunction({
//     name: "create_post",
//     body: q.Query(
//       q.Lambda(
//         ["title", "body"],
//         q.Create(q.Class("posts"), { data: { title: q.Var("title"), body: q.Var("body") } }))),
//     permissions: { call: "public" },
//     role: "server"
//   }))
//   .then((ret) => console.log(ret))
