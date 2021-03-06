import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  // If the user is focused on the toggle button and presses space enter
  handleToggleKeyDown = (event) => {
    if(event.keyCode === 32 || event.keyCode === 13) {
      this.toggleSidebar()
    }
  }

  // If the user is focused on a list and presses space, enter or tab
  handleListItemKeyDown = (event, location) => {
    if(event.keyCode === 32 || event.keyCode === 13) {
      this.props.toggleInfoWindow(location)
    }
  }

  // Moves focus to the info card
  focusToInfoCard = () => {
    document.getElementById('infoCard').infoCard.focus()
  }

  // If the user is focused on a list and presses enter
  handleFilterKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.props.updateFilterQuery(this.state.filterValue)
    }
  }

  // Reset the filter query
  resetFilter = (event) => {
    event.preventDefault()
    this.setState({filterValue: ''})
    this.props.updateFilterQuery('')
  }

  render() {
    const {sidebarOpen, filterValue} = this.state
    const {locations, toggleInfoWindow, infoWindowOpen, activeLocation, updateFilterQuery, query} = this.props

    // Determine toggle button state
    const toggleClass = sidebarOpen ? 'open' : 'closed'

    // Filter locations
    const filteredLocations = filterLocations(query, locations)

    return (
      <aside id="sidebar" className={toggleClass}>
          <div className="sidebar-toggle"
            tabIndex="0"
            aria-label="Toggle Sidebar" 
            role="button" 
            aria-pressed={sidebarOpen} 
            title="Toggle Sidebar"
            onClick={this.handleToggleClick}
            onKeyDown={this.handleToggleKeyDown}>
          </div>
          <div className="filter-control">
            <input
              type="text"
              value={filterValue}
              placeholder="Filter Locations"
              onChange={this.handleFilterInput}
              onKeyDown={this.handleFilterKeyDown}
              aria-label="Filter Locations"
            />
            <input type="button" onClick={() => { updateFilterQuery(filterValue) }} value="Filter"/>
          </div>
          {(typeof filteredLocations !== 'undefined') && filteredLocations.length > 0 && (
          <nav>
            <ul className="location-list">
              {filteredLocations.map((location) => (
                <li 
                  key={location.id} 
                  tabIndex="0"
                  role="button"
                  aria-pressed={(infoWindowOpen &&activeLocation === location.id)}
                  title={"View information about " + location.name}
                  onClick={() => { toggleInfoWindow(location) }}
                  onKeyDown={(event) => { this.handleListItemKeyDown(event, location) }}
                  className={(infoWindowOpen && activeLocation === location.id) ? 'active' : 'inactive'}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          </nav>
          )}
          {query !== '' && (
            <p className="search-text">
              Showing {filteredLocations.length} results. <a href="#removefilters" title="Remove all filters" aria-label="Remove all filters" onClick={this.resetFilter}>Click here</a> to reset filter.
            </p>
          )}
      </aside>
    );
  }
}

Sidebar.propTypes = {
  locations: PropTypes.array,
  toggleInfoWindow: PropTypes.func.isRequired,
  infoWindowOpen: PropTypes.bool.isRequired,
  activeLocation: PropTypes.number,
  updateFilterQuery: PropTypes.func.isRequired,
  query: PropTypes.string
}

export default Sidebar;