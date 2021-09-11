import React from 'react'
import MarkerManager from '../../util/marker_manager'

class BenchMap extends React.Component {
  componentDidMount() {
    const mapOptions = {
      center: {
        lat: 37.7758, 
        lng: -122.435
      },
      zoom: 13
    }

    // this.map = new google.maps.Map(this.mapNode, mapOptions)
    this.map = new google.maps.Map(document.getElementById('map-container'), mapOptions)
    this.MarkerManager = new MarkerManager(this.map)
    this.MarkerManager.updateMarkers(this.props.benches)

    google.maps.event.addListener(this.map, 'idle', () => {
      const bounds = this.map.getBounds();
      // alert('map has moved, check console to see updated bounds');
      const mapBounds = { 
        "northEast": {
          "lat": bounds.getNorthEast().lat(),
          "lng": bounds.getNorthEast().lng()
        },
        "southWest": {
          "lat": bounds.getSouthWest().lat(),
          "lng": bounds.getSouthWest().lng()
        }
      }
      
      this.props.updateBounds({ bounds: mapBounds });

      // console.log('center',
      //   bounds.getCenter().lat(),
      //   bounds.getCenter().lng());
      // console.log("north east",
      //   bounds.getNorthEast().lat(),
      //   bounds.getNorthEast().lng());
      // console.log("south west",
      //   bounds.getSouthWest().lat(),
      //   bounds.getSouthWest().lng());
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.benches !== prevProps.benches)
      this.MarkerManager.updateMarkers(this.props.benches)
  }

  render() {
    return(
      // <div id='map-container' ref={ map => this.mapNode = map }></div>
      <div id='map-container'></div>
    )
  }
}

export default BenchMap

// https://developers.google.com/places/web-service/search