import React from 'react'
import MarkerManager from '../util/marker_manager'

class BenchMap extends React.Component {
  // controller(props) {
  //   this.map = React.createRef()
  // }

  componentDidMount() {
    const { benches } = this.props

    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13
    }
    this.map = new google.maps.Map(this.mapNode, mapOptions)
    this.MarkerManager = new MarkerManager(this.map)
    this.MarkerManager.updateMarkers(benches)
  }

  componentDidUpdate(prevProps) {
    const { benches } = this.props
    if (prevProps.benches !== benches) this.MarkerManager.updateMarkers(benches)
  }

  render() {
    return <div id="map-container" ref={ref => (this.mapNode = ref)} />
  }
}

export default BenchMap
