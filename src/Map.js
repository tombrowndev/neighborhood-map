import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends Component {
  render() {
    const GoogleMapContainer = withScriptjs()

    return (
      <div id="map">
        <DumbGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCaGDMnRUJcAFA47lv7cIFlVZ_gYfGQATg"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
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
      lat: 52.6364897,
      lng: -1.1385945
    }}
  >
  </GoogleMap>
)))

export default Map;