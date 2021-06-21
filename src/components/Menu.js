import React from 'react';
import './Menu.css';

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

 render() {
    const visibilityClass = this.props.visible ? 'show' : 'hide';
    return (
      <div id='sideMenu' className={visibilityClass}>
        <ul>
          <li className='title'>Getting Started</li>
          <li><a href="#">Setup</a></li>
          <li className='title'>Basic</li>
          <li><a href="#">Satellites</a></li>
          <li><a href="#">Ground Stations</a></li>
          <li><a href="#">Ground Station Networks</a></li>
          <li><a href="#">Clocks</a></li>
          <li><a href="#">Universe</a></li>
          <li className='title'>Services</li>
          <li><a href="#">Servers</a></li>
          <li><a href="#">Clients</a></li>
          <li><a href="#">The Main Service</a></li>
        </ul>
      </div>
    )
  }
}

export default Menu;
