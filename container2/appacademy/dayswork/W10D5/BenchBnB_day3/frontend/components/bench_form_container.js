import { connect } from 'react-redux'

import { createBench } from '../actions/bench_action'
import BenchForm from './bench_form'

const mstp = (state, { location }) => {
  return {
    lat: new URLSearchParams(location.search).get('lat'),
    lng: new URLSearchParams(location.search).get('lng')
  }
}

const mdtp = dispatch => ({
  createBench: bench => dispatch(createBench(bench))
})

export default connect(
  mstp,
  mdtp
)(BenchForm)

// var paramsString = "q=URLUtils.searchParams&topic=api";
// var searchParams = new URLSearchParams(paramsString);

// //Iterate the search parameters.
// for (let p of searchParams) {
//   console.log(p);
// }

// searchParams.has("topic") === true; // true
// searchParams.get("topic") === "api"; // true
// searchParams.getAll("topic"); // ["api"]
// searchParams.get("foo") === null; // true
// searchParams.append("topic", "webdev");
// searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
// searchParams.set("topic", "More webdev");
// searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
// searchParams.delete("topic");
// searchParams.toString(); // "q=URLUtils.searchParams"
