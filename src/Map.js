import React, { PureComponent } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

/* Config */
import {gmKey} from './config'

/* Utilities */
import {filterLocations} from './utils'

class Map extends PureComponent {
  render() {
    const { locations, infoWindowOpen, activeLocation, locationData, toggleInfoWindow, query } = this.props
    const element = <div style={{ height: `100%` }} />

    // Filter locations
    const filteredLocations = filterLocations(query, locations)

    return (
      <div id="map">
        <DumbGoogleMap
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3&key=" + gmKey}
          loadingElement={element}
          containerElement={element}
          mapElement={element}
          locations={filteredLocations}
          infoWindowOpen={infoWindowOpen}
          activeLocation={activeLocation}
          locationData={locationData}
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
        onClick={() => { props.toggleInfoWindow(location) }}
        animation={(props.infoWindowOpen && props.activeLocation === location.id) ? 1 : 3}
      >

      {props.infoWindowOpen && props.activeLocation === location.id && (
          <InfoWindow onCloseClick={() => { props.toggleInfoWindow(location) }}>
            <div className="info-card">
              <h4>{location.name}</h4>
              <hr/>
              {props.locationData.hasOwnProperty('error') ? (
                <p>{props.locationData.error}</p>
              ):(
              <div className="foursquare-data">
                <b>Rating</b>
                <p>{props.locationData.rating}</p>
                <b>Status</b>
                <p>{props.locationData.status}</p>
                <b>Contact</b>
                 <p>{props.locationData.phone}</p>
                <hr/>
                <p>Data from the <a href="https://foursquare.com">Foursquare API</a></p>
              </div>
              )}
            </div>
          </InfoWindow>
      )}

      </Marker>

    ))}
  </GoogleMap>
)))

export default Map;