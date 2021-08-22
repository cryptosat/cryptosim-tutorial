import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './cryptosat_logo.svg';
import Menu from './Menu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBug } from '@fortawesome/pro-light-svg-icons'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.fileBug = this.fileBug.bind(this);
    this.setMenuVisible = this.setMenuVisible.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuVisible: false,
      easterEgg: false,
    };

    window.document.addEventListener('keydown', (e) => {
      if (e.altKey && e.ctrlKey) {
        this.setState({
          easterEgg: true,
        })
      }
    });
  }

  setMenuVisible(visible) {
    this.setState({
      menuVisible: visible
    });
  }

  toggleMenu(e) {
    e.stopPropagation();
    this.setMenuVisible(!this.state.menuVisible);
  }

  fileBug(e) {
    e.stopPropagation();
    window.open("https://github.com/cryptosat/cryptosim-tutorial/issues/new");
  }

  render() {
    const href = this.state.easterEgg ? '/multisat' : '/';
    return(
      <div className='navbar'>
        <Menu visible={this.state.menuVisible} setMenuVisible={this.setMenuVisible}/>
        <div className='title-container'>
          <Link to={href}>
            <img src={logo} alt=''/>
            Crytposat <b>Simulator</b>
          </Link>
        </div>
        <div className='actions-container'>
          <button onClick={this.fileBug}>
            <FontAwesomeIcon icon={faBug}/>
          </button>
          <button onClick={this.toggleMenu}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
        </div>
      </div>
    )
  }
}

export default NavBar;
