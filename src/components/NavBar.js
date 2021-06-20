import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

 render() {
    return(
      <div className='navbar'>
        Cryptosim Tutorial
        <a>
          <FontAwesomeIcon icon={faBars} style={{'float': 'right'}}/>
        </a>
      </div>
    )
  }
}

export default NavBar
