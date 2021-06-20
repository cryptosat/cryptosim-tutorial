import React from 'react';
import './NavBar.css';
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
    const visibilityClass = this.state.menuVisible ? 'show' : 'hide';
    const menu = (
      <div id='sideMenu' className={visibilityClass}>
        Hello, World!
      </div>
    )
    return(
      <div className='navbar'>
        {menu}
        Cryptosim Tutorial
        <button onClick={this.onClick}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
      </div>
    )
  }
}

export default NavBar
