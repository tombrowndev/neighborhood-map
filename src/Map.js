import React, { PureComponent } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

/* Config */
import {gmKey} from './config'

class Map extends PureComponent {
  render() {
    const { locations, infoWindowOpen, activeLocation, toggleInfoWindow } = this.props
    const element = <div style={{ height: `100%` }} />

    return (
      <div id="map">
        <DumbGoogleMap
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3&key=" + gmKey}
          loadingElement={element}
          containerElement={element}
          mapElement={element}
          locations={locations}
          infoWindowOpen={infoWindowOpen}
          activeLocation={activeLocation}
          toggleInfoWindow={toggleInfoWindow}
        />
      </div>
    );
  }
}

// The dumb container which includes the scripts required for the google maps api
const DumbGoogleMap = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{
      lat: 52.6295473,
      lng: -1.1347837
    }}
  >
    {props.locations.length && props.locations.map((location) => (
      <Marker
        key={location.id}
        position={location.position}
        title={location.name}
        onClick={() => { props.toggleInfoWindow(location.id) }}>

      {props.infoWindowOpen && props.activeLocation === location.id && (
          <InfoWindow onCloseClick={() => { props.toggleInfoWindow(location.id) }}>
            <div>
              {location.name}
            </div>
          </InfoWindow>
      )}

      </Marker>

    ))}
  </GoogleMap>
)))

export default Map;