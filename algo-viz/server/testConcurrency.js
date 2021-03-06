const axios = require("axios");
const funcs = require("./execute/tests/funcs");
const ENDPOINT = process.env.ENDPOINT;

if (!ENDPOINT) {
  throw new Error("Endpoint must be specified.");
}

const responses = [];
const start = Date.now();
let count = 0;
for (const name in funcs) {
  count++;
  responses.push(
    axios.post(
      ENDPOINT,
      {
        code: funcs[name],
      },
      {
        withCredentials: true,
      }
    )
  );
}

Promise.all(responses).then((results) => {
  for (const { data } of results) {
    if (!data.steps || data.steps.length < 1) {
      throw new Error("Test Failed.");
    }
  }
  const end = Date.now();
  console.log(end - start, "ms to run", count, "submissions");
});
