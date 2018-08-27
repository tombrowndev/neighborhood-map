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
    query: ''
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
  toggleInfoWindow = (id) => {
    //If it's already open and the id is the same as the current active location
    if(this.state.infoWindowOpen && id === this.state.activeLocation) {
      this.closeInfoWindow()
    } else {
      this.setState({
        infoWindowOpen: true,
        activeLocation: id
      })
    }
  }

  // Closes the info window
  closeInfoWindow = () => {
    this.setState({
      infoWindowOpen: false
    })
  }

  // Updates the query
  updateFilterQuery = (query) => {
    this.setState({query: query})
  }

  render() {
    const {locations, infoWindowOpen, activeLocation, query} = this.state

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
          closeInfoWindow={this.closeInfoWindow}
          query={query}
          />
      </div>
    );
  }
}

export default App;
