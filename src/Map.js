import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

/* Utilities */
import {filterLocations} from './utils'

class Map extends PureComponent {
  componentDidMount() {
    // Error to the console if maps is not available
    if(!window.google) {
      console.log('Error loading the Google Maps Javascript API. Please check the script tag and credentials.')
    }
  }
  render() {
    const { locations, infoWindowOpen, activeLocation, locationData, toggleInfoWindow, query } = this.props
    const element = <div style={{ height: `100%` }} />

    // Filter locations
    const filteredLocations = filterLocations(query, locations)

    return (
      <div id="map">
        {window.google ? (
        <DumbGoogleMap
          loadingElement={element}
          containerElement={element}
          mapElement={element}
          locations={filteredLocations}
          infoWindowOpen={infoWindowOpen}
          activeLocation={activeLocation}
          locationData={locationData}
          toggleInfoWindow={toggleInfoWindow}
        />
        ) : (
          <div className="map-error">
            <h2>Whoops!&hellip;</h2>
            <p>Sorry, but we are having trouble loading the map at the moment.</p>
          </div>
        )}
      </div>
    )
  }
}

Map.propTypes = {
  locations: PropTypes.array,
  infoWindowOpen: PropTypes.bool.isRequired,
  activeLocation: PropTypes.number,
  toggleInfoWindow: PropTypes.func.isRequired,
  query: PropTypes.string,
  locationData: PropTypes.object
}

// The dumb container which includes the scripts required for the google maps api
const DumbGoogleMap = withGoogleMap((props) => (
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
        animation={(props.infoWindowOpen && props.activeLocation === location.id) ? 1 : 0}
      >

      {props.infoWindowOpen && props.activeLocation === location.id && (
          <InfoWindow onCloseClick={() => { props.toggleInfoWindow(location) }}>
            <div id="infoCard" tabIndex="0" autofocus>
              <h4 tabIndex="0">{location.name}</h4>
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
))

DumbGoogleMap.propTypes = {
  loadingElement: PropTypes.object.isRequired,
  containerElement: PropTypes.object.isRequired,
  mapElement: PropTypes.object.isRequired,
  locations: PropTypes.array,
  infoWindowOpen: PropTypes.bool.isRequired,
  activeLocation: PropTypes.number,
  locationData: PropTypes.object,
  toggleInfoWindow: PropTypes.func.isRequired
}

export default Map;