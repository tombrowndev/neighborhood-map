import React, { Component } from 'react';

/* Components */
import Sidebar from './Sidebar'
import Map from './Map'

class App extends Component {
  state = {
    locations: []
  }

  render() {
    const {locations} = this.state
    return (
      <div id="App">
        <Sidebar locations={locations} />
        <Map locations={locations} />
      </div>
    );
  }
}

export default App;
