import React from 'react'
import BenchMap from './bench_map'
import BenchIndex from './bench_index_container'

export default props => (
  <div>
    <BenchMap
      benches={props.benches}
      updateFilter={props.updateFilter}
      dispatch={props.dispatch}
    />
    <BenchIndex {...props} />
  </div>
)
