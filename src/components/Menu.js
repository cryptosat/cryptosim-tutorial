import React from 'react';
import './Menu.css';


class Menu extends React.Component {

 render() {
    const visibilityClass = this.props.visible ? 'show' : 'hide';
    return (
      <div id='sideMenu' className={visibilityClass}>
        <ul>
          <li className='title'>Getting Started</li>
          <li><a href="#">Setup</a></li>
          <li className='title'>Satellites</li>
          <li><a href='#'>Satellite Basics</a></li>
          <li><a href='#'>Two Line Element Sets</a></li>
          <li><a href='#'>Orbit</a></li>
          <li><a href='#'>Positioning</a></li>
          <li className='title'>Ground Stations</li>
          <li><a href="#">Ground Station Basics</a></li>
          <li><a href="#">Line of Sight</a></li>
          <li><a href="#">Transmission Windows</a></li>
          <li className='title'>Ground Station Networks</li>
          <li><a href="#">Ground Station Networks Basics</a></li>
          <li><a href="#">Presets</a></li>
          <li><a href="#">Line of Sight</a></li>
          <li><a href="#">Coverage</a></li>
          <li><a href="#">Transmission Windows</a></li>
          <li className='title'>Clock</li>
          <li><a href="#">Clock Basics</a></li>
          <li><a href="#">Advance</a></li>
          <li><a href="#">Play and Pause</a></li>
          <li><a href="#">Playback Speed</a></li>
          <li><a href="#">Callbacks</a></li>
          <li className='title'>Universe</li>
          <li><a href="#">Universe Basics</a></li>
          <li><a href="#">Satellite Transmission</a></li>
          <li><a href="#">Ground Station Transmission</a></li>
          <li className='title'>Servers</li>
          <li><a href="#">Server Basics</a></li>
          <li><a href="#">Binding to Satellite</a></li>
          <li><a href="#">Reciving Messages</a></li>
          <li><a href="#">Sending Messages</a></li>
          <li><a href="#">Broadcasting Messages</a></li>
          <li className='title'>Clients</li>
          <li><a href="#">Clients Basics</a></li>
          <li><a href="#">Sending Messages</a></li>
          <li><a href="#">Recieving Messages</a></li>
          <li><a href="#">Asynchronous Communication</a></li>
          <li className='title'>Other</li>
          <li><a href="#">Serialization</a></li>
        </ul>
      </div>
    )
  }
}

export default Menu;
