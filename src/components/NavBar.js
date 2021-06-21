import React from 'react';
import './NavBar.css';
import Menu from './Menu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBug } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
    }
    this.fileBug = this.fileBug.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.stopPropagation();
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  fileBug(e) {
    e.stopPropagation();
    window.open("https://github.com/cryptosat/cryptosim-tutorial/issues/new");
  }

 render() {
    const overlay = this.state.menuVisible ? (
      <div id='sideMenuOverlay' onClick={this.toggleMenu}></div>
    ) : null;
    return(
      <div className='navbar'>
        {overlay}
        <Menu visible={this.state.menuVisible} />
        Cryptosim Tutorial
        <button onClick={this.toggleMenu}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
        <button onClick={this.fileBug}>
          <FontAwesomeIcon icon={faBug}/>
        </button>
      </div>
    )
  }
}

export default NavBar;
