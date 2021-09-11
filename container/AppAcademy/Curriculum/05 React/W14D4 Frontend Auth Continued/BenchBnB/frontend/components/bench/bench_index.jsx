import React from 'react';
import BenchIndexItem from './bench_index_item'

class BenchIndex extends React.Component {
  componentDidMount() {
    this.props.fetchBenches()
  }

  render() {
    const dispBenches = this.props.benches.map( bench => {
      return (
        <BenchIndexItem key={ bench.id } bench={ bench } />
      )
    })
    return(
      <div>
        <h1>Benches:</h1>
        <ul>
          { dispBenches }
        </ul>
      </div>
    )
  }
}

export default BenchIndex