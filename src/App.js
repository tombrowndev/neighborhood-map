import React, { Component } from 'react';

/* Components */
import Sidebar from './Sidebar'
import Map from './Map'

/* Config */
import {fsId, fsScrt} from './config.js'

class App extends Component {
  state = {
    locations: [],
    infoWindowOpen: false,
    activeLocation: 0,
    query: '',
    locationData: {}
  }

  componentDidMount() {
    this.getLocalLocations()
      .then((locations) => {
        this.setState({locations})
      })
      .catch((error) => {
        console.log('Can\'t fetch local data', error)
      })
  }

  // Fetch local location data
  // Returns a Promise
  getLocalLocations = () => {
    return fetch('./data/locations.json')
      .then((res) => {
        if(res.status !== 200) {
          throw Error('Local Location Data. HTTP Code: ' + res.status)
        }
        return res.json()
      })
      .then(data => {
        return data
      })
  }

  // Opens the info window
  toggleInfoWindow = (location) => {
    //If it's already open and the id is the same as the current active location
    if(this.state.infoWindowOpen && location.id === this.state.activeLocation) {
      this.closeInfoWindow()
    } else {
      this.setState({
        infoWindowOpen: true,
        activeLocation: location.id,
      })

      this.getLocationData(location.foursquareId)
        .then((data) => {
          let rating, status, phone
          const venue = data.response.venue

          if(venue.hasOwnProperty('rating')) {
            rating = venue.rating
          } else {
            rating = 'Unknown'
          }

          if(venue.hasOwnProperty('hours') && venue.hours.hasOwnProperty('status')) {
            status = venue.hours.status
          } else {
            status = 'Unknown'
          }
          
          if(venue.hasOwnProperty('contact') && venue.contact.hasOwnProperty('formattedPhone')) {
            phone = venue.contact.formattedPhone
          } else {
            phone = 'Unknown'
          }

          this.setState({locationData: {rating, status, phone}})
        })
        .catch((error) => {
          console.log('Couldn\'t fetch external data', error)
          this.setState({locationData: {error: 'Couldn\'t connect to Foursquare'}})
        })
    }
  }

  // Gets the external location data
  getLocationData = (venueId) => {
    return fetch('https://api.foursquare.com/v2/venues/'+venueId+'?client_id='+fsId+'&client_secret='+fsScrt+'&v=201800826')
      .then((res) => {
        if(res.status === 429) {
          throw Error('Quota Limit Reached. HTTP Code: ' + res.status)
        } else if(res.status !== 200) {
          throw Error('Foursquare Data. HTTP Code: ' + res.status)
        }

        return res.json()
      })
      .then(data => {
        return data
      })
  }

  // Closes the info window
  closeInfoWindow = () => {
    this.setState({
      infoWindowOpen: false,
      'locationData': {}
    })
  }

  // Updates the query
  updateFilterQuery = (query) => {
    this.closeInfoWindow()
    this.setState({query: query.trim()})
  }

  render() {
    const {locations, infoWindowOpen, activeLocation, query, locationData} = this.state

    return (
      <div id="app">
        <Sidebar 
          locations={locations}
          toggleInfoWindow={this.toggleInfoWindow}
          infoWindowOpen={infoWindowOpen}
          activeLocation={activeLocation}
          updateFilterQuery={this.updateFilterQuery}
          query={query}
        />
        <Map 
          locations={locations}
          infoWindowOpen={infoWindowOpen}
          activeLocation={activeLocation}
          toggleInfoWindow={this.toggleInfoWindow}
          query={query}
          locationData={locationData}
          />
      </div>
    );
  }
}

export default App;
