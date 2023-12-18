import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";
import logo from "./cryptosat_logo.svg";
import lightLogo from "./cryptosat_logo_light.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/pro-light-svg-icons";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.props.toggleMenu) this.props.toggleMenu();
  }

  render() {
    const href = "/";

    let className = 'navbar';
    let hamburgerColor = 'white';
    if(this.props.theme === 'light') {
      className += ' light';
      hamburgerColor = 'black';
    }


    return (
        <>
          <div className={className}>
            <div className="actions-container">
              <button onClick={this.toggleMenu}>
                <FontAwesomeIcon size="lg" color={hamburgerColor} icon={faBars}/>
              </button>
            </div>
            <div className="title-container">
              <Link to={href} className={this.props.theme}>
                <img src={this.props.theme === 'light' ? lightLogo : logo} alt=""/>
                Cryptosat Simulator
              </Link>
            </div>
            <div className="actions-container">
            </div>
          </div>
        </>
    );
  }
}

export default NavBar;
