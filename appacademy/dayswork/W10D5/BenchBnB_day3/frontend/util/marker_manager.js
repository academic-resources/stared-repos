import benches_reducer from '../reducers/benches_reducer'

class MarkerManager {
  constructor(map) {
    this.map = map
    this.markers = {}
  }

  updateMarkers(benches) {
    const benchesHash = {}
    benches.forEach(bench => {
      benchesHash[bench.id] = bench
      if (!this.markers[bench.id]) {
        const position = { lat: bench.lat, lng: bench.lng }
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          title: bench.description
        })
        this.markers[bench.id] = marker
      }
    })
    Object.keys(this.markers).forEach(key => {
      if (!benchesHash[key]) {
        delete this.markers[key]
      }
    })
  }
}

export default MarkerManager
