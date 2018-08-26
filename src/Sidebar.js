import React, { Component } from 'react';
import menuIcon from './menu.svg'

class Sidebar extends Component {
  state = {
    sidebarOpen: false
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

  render() {
    const {sidebarOpen} = this.state
    const {locations} = this.props

    // Determine toggle button state
    const toggleClass = sidebarOpen ? 'open' : 'closed'

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
          <ul className="location-list">
            {locations.length && locations.map((location) => (
              <li key={location.id} tabIndex="0">{location.name}</li>
            ))}
          </ul>
      </div>
    );
  }
}

export default Sidebar;