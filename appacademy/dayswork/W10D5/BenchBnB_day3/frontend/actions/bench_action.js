export const RECEIVE_BENCHES = 'RECEIVE_BENCHES'
import * as ApiUtil from '../util/bench_api_util'

const receiveBenches = benches => ({
  type: RECEIVE_BENCHES,
  benches
})

export const fetchBenches = filters => dispatch =>
  ApiUtil.fetchBenches(filters).then(benches =>
    dispatch(receiveBenches(benches))
  )

export const receiveBench = ({ bench, reviews, authors }) => ({
  type: RECEIVE_BENCH,
  bench,
  reviews,
  authors
})

export const createBench = bench => dispatch =>
  ApiUtil.createBench(bench).then(bench => dispatch(receiveBench(bench)))
