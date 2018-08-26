import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends Component {
  render() {
    const element = <div style={{ height: `100%` }} />

    return (
      <div id="map">
        <DumbGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaGDMnRUJcAFA47lv7cIFlVZ_gYfGQATg"
          loadingElement={element}
          containerElement={element}
          mapElement={element}
        />
      </div>
    );
  }
}

// The dumb container which includes the scripts required for the google maps api
const DumbGoogleMap = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{
      lat: 52.633857,
      lng: -1.1384924
    }}
  >
  </GoogleMap>
)))

export default Map;