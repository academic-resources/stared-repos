import React from 'react'
import MarkerManager from '../util/marker_manager'

class BenchMap extends React.Component {
  constructor(props) {
    super(props)
    this.handleIdle = this.handleIdle.bind(this)
  }

  componentDidMount() {
    const { benches } = this.props

    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 13
    }
    this.map = new google.maps.Map(this.mapNode, mapOptions)
    this.map.addListener('idle', this.handleIdle)
    this.MarkerManager = new MarkerManager(this.map)
    this.MarkerManager.updateMarkers(benches)
  }

  handleIdle() {
    const latLngBounds = this.map.getBounds()
    const ne = latLngBounds.getNorthEast()
    const sw = latLngBounds.getSouthWest()
    const bounds = {
      northEast: {
        lat: ne.lat(),
        lng: ne.lng()
      },
      southWest: {
        lat: sw.lat(),
        lng: sw.lng()
      }
    }
    this.props.updateFilter('bounds', bounds)
  }

  componentDidUpdate(prevProps) {
    const { benches } = this.props
    if (prevProps.benches !== benches) this.MarkerManager.updateMarkers(benches)
  }

  render() {
    return <div id='map-container' ref={ref => (this.mapNode = ref)} />
  }
}

export default BenchMap
