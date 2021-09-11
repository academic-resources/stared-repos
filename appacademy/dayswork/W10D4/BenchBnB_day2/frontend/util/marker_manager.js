class MarkerManager {
  constructor(map) {
    this.map = map
    this.markers = {}
  }

  updateMarkers(benches) {
    benches.forEach(bench => {
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
  }
}

export default MarkerManager
