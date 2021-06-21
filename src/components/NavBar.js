import React from 'react';
import './NavBar.css';
import Menu from './Menu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
    }
    this.onClick = this.onClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  onClick(e) {
    this.toggleMenu();
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

 render() {
    const overlay = this.state.menuVisible ? (
      <button id='sideMenuOverlay' onClick={this.onClick}></button>
    ) : null;
    return(
      <div className='navbar'>
        {overlay}
        <Menu visible={this.state.menuVisible} />
        Cryptosim Tutorial
        <button onClick={this.onClick}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
      </div>
    )
  }
}

export default NavBar;
