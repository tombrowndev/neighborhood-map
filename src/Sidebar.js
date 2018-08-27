import React, { Component } from 'react';
import menuIcon from './menu.svg'

/* Utilities */
import {filterLocations} from './utils'

class Sidebar extends Component {
  state = {
    sidebarOpen: false,
    filterValue: ''
  }

  // If the user clicks the menu button
  handleToggleClick = () => {
    this.toggleSidebar()
  }

  // If the user is focused on the toggle button and presses enter (key 32)
  handleToggleKeyDown = (event) => {
    if(event.keyCode === 32) {
      this.toggleSidebar()
    }
  }

  // Toggles whether the sidebar is open
  toggleSidebar = () => {
    this.setState((state) => {
      return {sidebarOpen: !state.sidebarOpen}
    })
  }

  // Connects the filter input
  handleFilterInput = (event) => {
    this.setState({filterValue: event.target.value})
  }

  render() {
    const {sidebarOpen, filterValue} = this.state
    const {locations, toggleInfoWindow, infoWindowOpen, activeLocation, updateFilterQuery, query} = this.props

    // Determine toggle button state
    const toggleClass = sidebarOpen ? 'open' : 'closed'

    // Filter locations
    const filteredLocations = filterLocations(query, locations)

    return (
      <div id="sidebar" className={toggleClass}>
          <div className="sidebar-toggle"
            tabIndex="0"
            aria-label="Toggle Sidebar" 
            role="button" 
            aria-pressed={sidebarOpen} 
            title="Toggle Sidebar"
            onClick={this.handleToggleClick}
            onKeyDown={this.handleToggleKeyDown}>
            <img alt="Hamburger Icon" src={menuIcon} />
          </div>
          <div className="filter-control">
            <input type="text" value={filterValue} placeholder="Filter Locations" onChange={this.handleFilterInput} aria-label="Filter Locations"/>
            <input type="button" onClick={() => { updateFilterQuery(filterValue) }} value="Filter"/>
          </div>
          <ul className="location-list">
            {filteredLocations.length && filteredLocations.map((location) => (
              <li 
                key={location.id} 
                tabIndex="0"
                onClick={() => { toggleInfoWindow(location.id) }}
                className={(infoWindowOpen && activeLocation === location.id) ? 'active' : 'inactive'}
              >
                {location.name}
              </li>
            ))}
          </ul>
      </div>
    );
  }
}

export default Sidebar;