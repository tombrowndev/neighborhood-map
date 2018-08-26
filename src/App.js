import React, { Component } from 'react';

/* Components */
import Sidebar from './Sidebar'
import Map from './Map'

/* Config */
import {fsId, fsScrt} from './config.js'

class App extends Component {
  state = {
    locations: []
  }

  componentDidMount() {
    this.getLocalLocations()
      .then(localData => {
        // Loop through each local location and get the info from Foursquare
        return Promise.all(localData.map((localLocation) => (
          this.getLocationFromFoursquare(localLocation.foursquareId)
            .then((data) => data.response.venue)
        )))
      })
      .then((locations) => {
        // Add location to state
        this.setState({locations})
      })
  }

  // Fetch local location data
  // Returns a Promise
  getLocalLocations = () => {
    return fetch('./data/locations.json')
      .then((res) => {
        return res.json()
      })
      .catch((error) => {
        console.log('Can\'t fetch the local location data', error)
      })
  }

  // Fetch location data (Foursquare)
  // Returns a Promise
  getLocationFromFoursquare = (id) => {
    return fetch('https://api.foursquare.com/v2/venues/'+id+'?client_id='+fsId+'&client_secret='+fsScrt+'&v=201800826')
      .then((res) => {
        return res.json()
      })
      .catch((error) => {
        console.log('Can\'t fetch the Foursquare data', error)
      })
  }

  render() {
    const {locations} = this.state
    return (
      <div id="app">
        <Sidebar locations={locations} />
        <Map locations={locations} />
      </div>
    );
  }
}

export default App;
