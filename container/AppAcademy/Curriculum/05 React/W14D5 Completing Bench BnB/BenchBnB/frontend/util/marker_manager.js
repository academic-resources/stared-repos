
export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
    this.createMarkerFromBench = this.createMarkerFromBench.bind(this)
  }
  
  updateMarkers(benches) {
    // console.log('time to update');
    let benchesObj = new Object
    benches.forEach(bench => {
      benchesObj[bench.id] = bench
    })

    debugger

    benches.forEach(bench => {
      if (!Object.keys(this.markers).includes(bench.id)) {
        this.markers[bench.id] = this.createMarkerFromBench(bench)
      }
    })
  }

  removeMarker(marker) {
    marker.setMap(null)

  }

  createMarkerFromBench(bench) {
    const { id, lat, lng, description } = bench
    return new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: description,
    })
  }
}